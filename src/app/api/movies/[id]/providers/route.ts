import { NextResponse } from "next/server";
import { getWatchProviders } from "@/services/tmdb";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return NextResponse.json(await getWatchProviders(Number(id)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to get watch providers", details: String(error) }, { status: 500 });
  }
}
