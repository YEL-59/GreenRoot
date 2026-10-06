/**
 * Utility functions for GreenRoot Next.js application
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}
