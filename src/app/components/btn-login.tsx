"use client";

import { useSession, signIn, signOut } from "next-auth/react";

function ButtonAuth() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}

export default ButtonAuth;
