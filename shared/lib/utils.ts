import { v7 as uuidv7 } from "uuid";

export function generateUID(): string {
  return uuidv7();
}
