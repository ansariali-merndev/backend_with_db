import { connectDB } from "@/lib/configdb";

await connectDB();

export function GET() {
  return Response.json({
    message: "success",
  });
}
