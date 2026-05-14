import { NextRequest, NextResponse } from "next/server";
import { discoverMovies } from "@/services/tmdb";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = Number(params.get("page") ?? "1");

  try {
    const payload = await discoverMovies({
      page,
      language: params.get("with_original_language") ?? undefined,
      genres: params.get("with_genres") ?? undefined,
      sortBy: params.get("sort_by") ?? undefined,
      runtimeLte: params.get("with_runtime.lte") ? Number(params.get("with_runtime.lte")) : undefined,
    });
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: "Failed to discover movies", details: String(error) }, { status: 500 });
  }
}
