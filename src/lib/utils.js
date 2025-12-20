import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function normalizeName(name) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Validation email : accepte TOUS les domaines
 * (gmail, yahoo, entreprise, etc.)
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


