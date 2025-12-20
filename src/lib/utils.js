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
 * VALID_DOMAINS doit exister
 * null = aucun filtrage → TOUS les domaines sont acceptés
 */
export const VALID_DOMAINS = () => null;
