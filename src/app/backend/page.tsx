"use client";
import React, { useState } from "react";

export default function Backend() {
  const [theUser, setTheUser] = useState({});
  async function fetchUsers() {
    const myUser = await fetch("http://localhost:3000/api/users");
    console.log("myUser:", myUser);
    return myUser.json();
  }

  return (
    <>
      <h1>{theUser && theUser?.first_name}</h1>
      <div>Backend Page</div>
      <button
        onClick={async () => {
          const user = await fetchUsers();
          console.log(user);
          setTheUser(user.data[0]);
        }}
      >
        Fetch Users
      </button>
    </>
  );
}
