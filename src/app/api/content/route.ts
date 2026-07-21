import { NextResponse } from "next/server";
import { getContent } from "@/services/redis.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "PT";

  try {
    const data = await getContent(lang);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Content Error:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}
