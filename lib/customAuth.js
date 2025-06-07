import { UserModel } from "@/models/userModel";
import { cookies } from "next/headers";

const getAuthorizedUser = async () => {
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID")?.value;

  if (!userID) {
    return Response.json({
      message: "unAuthorized",
    });
  }

  const user = await UserModel.findOne({ _id: userID });

  if (!user) {
    return Response.json({
      message: "failed",
    });
  }

  return Response.json({
    message: "success",
    user,
  });
};

export const checkAuthorized = async () => {
  const res = await getAuthorizedUser();
  const data = await res.json();
  return data;
};
