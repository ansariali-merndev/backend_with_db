import { connectDB } from "@/lib/configdb";
import { checkAuthorized, getAuthorizedUser } from "@/lib/customAuth";
import { TodoModel } from "@/models/todosModel";

await connectDB();

export async function GET() {
  try {
    const checkUser = await checkAuthorized();
    if (checkUser.message === "success") {
      const id = checkUser.user._id;
      let data = await TodoModel.find({ userID: id });
      if (data.length === 0) {
        data = [];
      }
      return Response.json(
        {
          message: "success",
          data,
        },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        {
          message: checkUser.message,
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({
      error: error.message,
    });
  }
}

export async function POST(request) {
  try {
    const checkUser = await checkAuthorized();

    if (checkUser.message === "success") {
      const { text } = await request.json();
      const newTodo = new TodoModel({ text, userID: checkUser.user._id });
      await newTodo.save();
      return Response.json(
        {
          message: "success",
        },
        {
          status: 201,
        }
      );
    } else {
      return Response.json(
        {
          message: checkUser.message,
        },
        {
          status: 401,
        }
      );
    }
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
        status: 200,
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
