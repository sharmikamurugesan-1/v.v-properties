import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLakhs(valueInLakhs: number): string {
  if (valueInLakhs >= 100) {
    const crores = valueInLakhs / 100;
    return `₹${crores.toFixed(2)} Cr`;
  }
  return `₹${valueInLakhs.toFixed(2)} L`;
}

export function formatExactINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCent(cents: number): string {
  return `${cents.toFixed(2)} Cents`;
}

export function formatSqFt(sqFt: number): string {
  return `${sqFt.toLocaleString('en-IN')} Sq.Ft`;
}
