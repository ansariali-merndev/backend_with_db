import { connectDB } from "@/lib/configdb";
import { TodoModel } from "@/models/todosModel";

await connectDB();

export async function GET() {
  try {
    const data = await TodoModel.find();
    return Response.json(
      {
        message: "success",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json({
      error: error.message,
    });
  }
}

export async function POST(request) {
  try {
    const { text } = await request.json();
    const newTodo = new TodoModel({ text });
    await newTodo.save();
    return Response.json(
      {
        message: "success",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
