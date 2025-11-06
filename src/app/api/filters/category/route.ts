import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 1, label: "OFF PLANS", value: "off-plans" },
    { id: 2, label: "READY TO LIVE", value: "ready-to-live" },
  ]);
}
