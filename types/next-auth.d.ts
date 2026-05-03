import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    phone: string;
    role: "ADMIN" | "STATION" | "CUSTOMER";
    accessToken: string;
  }

  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string;
      role?: "ADMIN" | "STATION" | "CUSTOMER";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    phone?: string;
    role?: "ADMIN" | "STATION" | "CUSTOMER";
    accessToken?: string;
  }
}
