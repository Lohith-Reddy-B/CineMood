import { NextRequest, NextResponse } from "next/server";
import { getSimilarMovies } from "@/services/tmdb";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  try {
    const { id } = await params;
    return NextResponse.json(await getSimilarMovies(Number(id), page));
  } catch (error) {
    return NextResponse.json({ error: "Failed to get similar movies", details: String(error) }, { status: 500 });
  }
}
