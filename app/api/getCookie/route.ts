// app/api/getCookie/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("auth_token")?.value;

  return NextResponse.json({ token });
}