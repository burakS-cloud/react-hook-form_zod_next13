import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://random-data-api.com/api/v2/users?size=2&is_xml=true",
    { next: { revalidate: 10 } }
  );
  const data = await res.json();
  console.log("data:", data);

  return NextResponse.json({ data });
}
