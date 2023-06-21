"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Deneme = () => {
  const pathname = usePathname();
  return (
    <>
      <div>Deneme</div>
      <span>Pathname: {pathname}</span>
      <br />
      <button>
        <Link
          style={{ textDecoration: "none" }}
          href={"http://localhost:3000/try/a"}
        >
          Click Me
        </Link>
      </button>
      <br />
      <Image
        width={200}
        height={200}
        src={
          "https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top"
        }
      />
    </>
  );
};

export default Deneme;
