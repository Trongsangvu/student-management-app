import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type QueryValue = string | number | boolean | undefined | null;

type QueryParams = Record<string, QueryValue>;

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generates a query string
export function generateQueryString(params: QueryParams = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });

  return query.toString();
}

// Parses query parameters
export function parseQueryParams(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams.entries());
}
