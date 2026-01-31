import { NextRequest, NextResponse } from "next/server";
import { addEmailSubscriber, initializeDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    await initializeDatabase();
    const result = await addEmailSubscriber(email.toLowerCase().trim());

    if (result.success) {
      return NextResponse.json({ message: "Successfully subscribed" });
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to subscribe" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
