import { NextResponse } from "next/server";

type ApiError = {
  message?: string;
  detail?: string;
};

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  status = 500,
  errorCode?: string
) {
  return NextResponse.json(
    {
      success: false,
      message,
      errorCode,
      statusCode: status,
    },
    { status }
  );
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    const err = error as ApiError;

    return err.message || err.detail || "Internal Server Error";
  }

  if (typeof error === "string") return error;

  return "Internal Server Error";
}