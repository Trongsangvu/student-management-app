import { scoreService } from "@/features/score/services/score-service";
import { errorMessage, errorResponse, successResponse } from "@/lib/responses";

type Params = {
  params: Promise<{ id: string; }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const data = await scoreService.getById(id);

    return successResponse(data);
  }
  catch (error) {
    return errorResponse(errorMessage(error));
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await scoreService.update(id, body);
    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const data = await scoreService.delete(id);
    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}