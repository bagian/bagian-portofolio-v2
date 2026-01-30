import { injectKnowledge } from "../../lib/seed-data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const message = await injectKnowledge();
    return NextResponse.json({ success: true, message });
  } catch (error: unknown) {
    console.error("Seed Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
