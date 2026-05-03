import { Center } from "@/features/centers";

export type PayoutStatus = "SETTLED" | "PROCESSING" | "FAILED";

export type Payout = {
  id: string;
  txnNumber: number;
  name: string;
  centerId: string;
  amount: number;
  remarks?: string;
  idempotencyKey: string;
  status: PayoutStatus;
  center: Partial<Center>;
  createdAt: string;
};

// model Payout {
//   id             String       @id @default(uuid())
//   txnNumber      Int          @default(autoincrement())
//   centerId       String
//   initiatedById  String
//   amount         Decimal      @db.Decimal(10, 2)
//   remarks        String?
//   status         PayoutStatus @default(PROCESSING)
//   idempotencyKey String       @unique
//   settledAt      DateTime?
//   createdAt      DateTime     @default(now())
//   updatedAt      DateTime     @updatedAt

//   center      Center @relation(fields: [centerId], references: [id])
//   initiatedBy User   @relation("PayoutInitiator", fields: [initiatedById], references: [id])

//   @@index([centerId])
//   @@index([status])
//   @@index([createdAt])
//   @@map("payouts")
// }

export type SendPayoutPayload = {
  centerId: string;
  amount: number;
  remarks?: string;
  idempotencyKey: string;
};
