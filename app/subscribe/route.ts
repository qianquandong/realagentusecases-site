import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

export function GET() {
  return NextResponse.redirect(SITE_CONFIG.substackUrl, 308);
}
