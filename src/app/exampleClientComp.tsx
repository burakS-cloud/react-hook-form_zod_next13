"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment();

  return <p>Active segment: {segment}</p>;
}
