/**
 * Utility functions for GreenRoot Next.js application
 * Production-ready utility helpers for styling, currency, and numerical formatting
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

const bnDigits: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

/**
 * Converts English digits to Bengali digits
 */
export function toBengaliNumber(val: number | string): string {
  return String(val).replace(/[0-9]/g, (w) => bnDigits[w] || w);
}

/**
 * Formats a price into BDT currency format
 */
export function formatPrice(amount: number, isBn: boolean = false): string {
  const formatted = formatNumber(amount);
  if (isBn) {
    return `৳${toBengaliNumber(formatted)}`;
  }
  return `৳${formatted}`;
}

/**
 * Truncates text cleanly at a word boundary
 */
export function truncate(text: string, length: number = 80): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trimEnd() + "...";
}
