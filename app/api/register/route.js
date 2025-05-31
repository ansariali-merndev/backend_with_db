import { UserModel } from "@/models/userModel";

export async function POST(request, context) {
  const { name, email, password } = await request.json();
  try {
    const userDetail = new UserModel({
      name,
      email,
      password,
    });
    await userDetail.save();
    return Response.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "failed",
      error: error.message,
    });
  }
}
