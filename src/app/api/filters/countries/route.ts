import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 1, label: "UAE", value: "ae" },
    { id: 2, label: "Monaco", value: "mc" },
    { id: 3, label: "Saudi Arabia", value: "sa" },
  ]);
}
