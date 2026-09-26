import type { VehicleCategory } from "../api/centers.types";

/** Every service is one fixed 30-minute slot. */
export const SERVICE_DURATION_MIN = 30;

export const VEHICLE_LABEL: Record<VehicleCategory, string> = {
  BIKE: "Bike",
  CAR: "Car",
};

/** "2000" -> "₹2,000" (Indian digit grouping, paise only when non-zero) */
export function formatServicePrice(price: string | number): string {
  const n = Number(price);
  if (!Number.isFinite(n)) return `₹${price}`;
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}
