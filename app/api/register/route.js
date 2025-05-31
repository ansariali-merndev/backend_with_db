import { connectDB } from "@/lib/configdb";
import { UserModel } from "@/models/userModel";
import bcrypt from "bcryptjs";

await connectDB();
export async function POST(request, context) {
  const { name, email, password } = await request.json();
  try {
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return Response.json({
        message: "failed",
        extraMessage: "Email Already exist!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDetail = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await userDetail.save();
    return Response.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "error",
      error: error.message,
    });
  }
}
