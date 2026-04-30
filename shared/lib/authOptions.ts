import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "./env";

/**
 * NextAuth wraps a Firebase phone-OTP login for the admin console.
 *
 * Flow:
 *   1. Client completes Firebase Phone OTP, receives an ID token.
 *   2. Client calls signIn("firebase", { idToken }).
 *   3. authorize() POSTs { firebaseIdToken } to backend /auth/login.
 *      Backend verifies the token, looks up the user by firebaseUid,
 *      and returns { role, user }. We accept only role === "ADMIN".
 *   4. We stash the Firebase ID token on the JWT so the axios client
 *      can attach it as Bearer on subsequent backend calls.
 *
 * Pre-requisite: the admin's phone must already exist in the User
 * table with role=ADMIN (use scripts/promote-admin.ts on the backend).
 */
type LoginResponse = {
  success: true;
  data: {
    role: "ADMIN" | "STATION" | "CUSTOMER";
    user?: { id: string; name: string; phone: string; role: string };
  };
};

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      id: "firebase",
      name: "Firebase Phone OTP",
      credentials: {
        idToken: { label: "Firebase ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) return null;

        const res = await fetch(`${env.apiBaseUrl}/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firebaseIdToken: credentials.idToken,
            name: "Admin",
          }),
        });

        if (!res.ok) {
          const body = await res.text().catch(() => "");
          console.warn(
            `[auth] backend /auth/login failed (${res.status}): ${body}`,
          );
          return null;
        }

        const json = (await res.json()) as LoginResponse;
        const user = json.data?.user;
        if (!user || json.data.role !== "ADMIN") return null;

        return {
          id: user.id,
          name: user.name,
          phone: user.phone,
          role: "ADMIN",
          accessToken: credentials.idToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id ?? "",
        role: token.role,
        phone: token.phone,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
