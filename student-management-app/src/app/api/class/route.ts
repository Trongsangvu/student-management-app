import { parseQueryParams } from '@/lib/utils';
import { classService } from "@/features/class/services/class-service";
import { errorMessage, errorResponse, successResponse } from "@/lib/responses";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = parseQueryParams(searchParams);

    const data = await classService.getAll(params);

    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await classService.create(body);

    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}