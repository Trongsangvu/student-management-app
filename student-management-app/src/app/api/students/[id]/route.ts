import { studentService } from "@/features/students/services/student-service";
import { errorMessage, errorResponse, successResponse } from "@/lib/responses";

type Params = {
  params: Promise<{ id: string; }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const data = await studentService.getById(id);

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
    const data = await studentService.update(id, body);
    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const data = await studentService.delete(id);
    return successResponse(data);
  } catch (error) {
    return errorResponse(errorMessage(error));
  }
}