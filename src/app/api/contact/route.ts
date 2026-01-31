import { NextRequest, NextResponse } from "next/server";
import { addContactSubmission, initializeDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, body } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!body || typeof body !== "string") {
      return NextResponse.json(
        { error: "Message body is required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (body.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 },
      );
    }

    await initializeDatabase();
    const result = await addContactSubmission(
      email.toLowerCase().trim(),
      body.trim(),
    );

    if (result.success) {
      const notifyEmail = process.env.NOTIFY_EMAIL;
      if (notifyEmail) {
        console.log(
          `New contact submission from ${email}: ${body.substring(0, 100)}...`,
        );
      }

      return NextResponse.json({ message: "Message sent successfully" });
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to send message" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
