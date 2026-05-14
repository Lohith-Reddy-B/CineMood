import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/services/tmdb";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? "";
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");

  if (!query.trim()) {
    return NextResponse.json({ page: 1, total_pages: 0, total_results: 0, results: [] });
  }

  try {
    return NextResponse.json(await searchMovies(query, page));
  } catch (error) {
    return NextResponse.json({ error: "Failed to search movies", details: String(error) }, { status: 500 });
  }
}
