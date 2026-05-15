import { scoreService } from "@/features/score/services/score-service";
import { errorMessage, errorResponse, successResponse } from "@/lib/responses";
import { parseQueryParams } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = parseQueryParams(searchParams);

    const data = await scoreService.getAll(params);
    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await scoreService.create(body);
    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}