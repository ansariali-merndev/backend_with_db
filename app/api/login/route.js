import { connectDB } from "@/lib/configdb";
import { UserModel } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();
  const cookieStore = await cookies();

  const UnAuthorized = Response.json({
    message: "failed",
    extraMessage: "Invalid Credentials",
  });

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return UnAuthorized;
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return UnAuthorized;
    }

    cookieStore.set("userID", user.id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return Response.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "error",
    });
  }
}
