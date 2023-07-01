import React from "react";
import ClientComp from "./clientComp";

// WHEN USING ROUTE HANDLERS, SUCH AS SENDING FETCH REQUEST TO await fetch("http://localhost:3000/api/users");
// AND WHEN SENDING THIS REQUEST INSIDE A SERVER COMPONENT, THERE'S NO WAY TO PREVENT THE CACHING FROM HAPPENING
// IF YOU'RE SENDING THE REQUEST DIRECTLY THROUGH A ROUTE HANDLERS, MAKE SURE YOU DO THAT INSIDE A CLIENT COMPONENT
// OTHERWISE, SENDING A REQUEST TO A ROUTE HANDLER INSIDE A SERVER COMPONENT, GETS CONFLICTED AND YOU GET THE
// SAME CACHED VALUE ALL THE TIME, REGARDLESS OF THE REVALIDATE PARAMS AND CACHE: NO-STORE

export default async function Backend() {
  const myUser = await fetch(
    "https://random-data-api.com/api/v2/users?size=1&is_xml=true",
    {
      next: { revalidate: 2 },
    }
  );

  // console.log("myUser:", myUser);
  let fetchedUser = await myUser.json();

  const changeName = (user: any) => {
    fetchedUser = user;
    return fetchedUser;
  };

  console.log("myUser from server:", fetchedUser);
  return (
    <>
      <div>Initial user{fetchedUser && fetchedUser?.first_name}</div>
      <ClientComp userComingFromServer={fetchedUser} />
    </>
  );
}
