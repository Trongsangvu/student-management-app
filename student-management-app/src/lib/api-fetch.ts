import { ApiError } from "./errors";

export async function apiFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      json.message || "Something went wrong",
      res.status
    );
  }

  return json as T;
}