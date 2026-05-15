import { subjectService } from "@/features/subjects/services/subject-service";
import { errorMessage, errorResponse, successResponse } from "@/lib/responses";
import { parseQueryParams } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = parseQueryParams(searchParams);

    const data = await subjectService.getAll(params);

    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await subjectService.create(body);

    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}