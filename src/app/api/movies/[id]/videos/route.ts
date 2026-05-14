import { NextResponse } from "next/server";
import { getMovieVideos } from "@/services/tmdb";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return NextResponse.json(await getMovieVideos(Number(id)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to get movie videos", details: String(error) }, { status: 500 });
  }
}
