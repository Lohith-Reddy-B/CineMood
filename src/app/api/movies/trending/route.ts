import { NextRequest, NextResponse } from "next/server";
import { getTrending } from "@/services/tmdb";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  try {
    return NextResponse.json(await getTrending(page));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trending movies", details: String(error) }, { status: 500 });
  }
}
