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

export async function DELETE(request, context) {
  const { _id } = await request.json();
  try {
    await TodoModel.deleteOne({ _id });
    return Response.json(
      {
        message: "success",
      },
      {
        status: 204,
      }
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

export async function PUT(request, context) {
  const { _id, value } = await request.json();
  try {
    const upadatedTodo = await TodoModel.findByIdAndUpdate(
      _id,
      {
        completed: value,
      },
      { new: true }
    );
    return Response.json({
      message: "success",
      todo: upadatedTodo,
    });
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
