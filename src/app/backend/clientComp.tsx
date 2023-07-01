// "use client";
// import React, { useState } from "react";

// export default function ClientComp() {
//   const [theUser, setTheUser] = useState({});
//   async function fetchUsers() {
//     const myUser = await fetch("http://localhost:3000/api/users");
//     const serializedUser = await myUser.json();
//     console.log("serializedUser in client comp:", serializedUser);
//     return serializedUser;
//   }

//   return (
//     <>
//       <h1>{theUser && theUser?.first_name}</h1>
//       <div>Backend Page</div>
//       <button
//         onClick={async () => {
//           const user = await fetchUsers();
//           console.log(user);
//           setTheUser(user.data[0]);
//         }}
//       >
//         Fetch Users
//       </button>
//     </>
//   );
// }

// WARNIN!!!!!!!!!!
// DO NOT USE SETSTATE IN ONCLICK EVENT HANDLER
"use client";
import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ClientComp({
  userComingFromServer,
}: {
  userComingFromServer: object;
}) {
  const router = useRouter();
  const [theUser, setTheUser] = useState({});
  const [isPending, startTransition] = useTransition();

  async function fetchUsers() {
    const myUser = await fetch("http://localhost:3000/api/users");
    // console.log("myUser:", await myUser.json());
    const serializedUser = await myUser.json();
    console.log("serializedUser:", serializedUser.data);
    setTheUser(serializedUser.data);
  }
  console.log("props:", userComingFromServer);

  useEffect(() => {
    setTheUser(userComingFromServer);
  }, []);

  return (
    <>
      <h1>{theUser && theUser?.first_name}</h1>
      <div>Backend Page</div>
      <button
        onClick={async () => {
          await fetchUsers();
          startTransition(() => {
            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state.
            router.refresh();
          });
          //   setTheUser(user.data);
        }}
      >
        Fetch Users
      </button>
    </>
  );
}
