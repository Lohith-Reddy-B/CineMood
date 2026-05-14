import { NextRequest, NextResponse } from "next/server";
import { getTopRated } from "@/services/tmdb";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  try {
    return NextResponse.json(await getTopRated(page));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch top-rated movies", details: String(error) }, { status: 500 });
  }
}
