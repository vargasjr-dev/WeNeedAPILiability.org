import { NextRequest, NextResponse } from "next/server";
import {
  createScenario,
  updateScenario,
  deleteScenario,
  getScenarios,
  initializeDatabase,
} from "@/lib/db";

function verifyAdminPassword(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const password = authHeader.substring(7);
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return false;
  }
  return password === adminPassword;
}

export async function GET(request: NextRequest) {
  if (!verifyAdminPassword(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initializeDatabase();
    const scenarios = await getScenarios();
    return NextResponse.json({ scenarios });
  } catch (error) {
    console.error("Error fetching scenarios:", error);
    return NextResponse.json(
      { error: "Failed to fetch scenarios" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminPassword(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, today, breakdown, solution, slug } = body;

    if (!title || !description || !today || !breakdown || !solution || !slug) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await initializeDatabase();
    const result = await createScenario({
      title,
      description,
      today,
      breakdown,
      solution,
      slug,
    });

    if (result.success) {
      return NextResponse.json({ message: "Scenario created successfully" });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error creating scenario:", error);
    return NextResponse.json(
      { error: "Failed to create scenario" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAdminPassword(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, title, description, today, breakdown, solution } = body;

    if (!slug || !title || !description || !today || !breakdown || !solution) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await initializeDatabase();
    const result = await updateScenario(slug, {
      title,
      description,
      today,
      breakdown,
      solution,
    });

    if (result.success) {
      return NextResponse.json({ message: "Scenario updated successfully" });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error updating scenario:", error);
    return NextResponse.json(
      { error: "Failed to update scenario" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminPassword(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await initializeDatabase();
    const result = await deleteScenario(slug);

    if (result.success) {
      return NextResponse.json({ message: "Scenario deleted successfully" });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error deleting scenario:", error);
    return NextResponse.json(
      { error: "Failed to delete scenario" },
      { status: 500 },
    );
  }
}
