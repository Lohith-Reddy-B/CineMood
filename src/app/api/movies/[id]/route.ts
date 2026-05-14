import { NextResponse } from "next/server";
import { getMovieDetails } from "@/services/tmdb";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return NextResponse.json(await getMovieDetails(Number(id)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to get movie details", details: String(error) }, { status: 500 });
  }
}
