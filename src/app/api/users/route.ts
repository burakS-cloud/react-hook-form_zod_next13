import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://random-data-api.com/api/v2/users?size=1&is_xml=true",
    {
      next: { revalidate: 2 },
    }
  );
  const data = await res.json();
  console.log("data from route:", data);

  return NextResponse.json({ data });
}
