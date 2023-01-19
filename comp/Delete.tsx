"use client";
import styles from "../styles/delete.module.scss";
import React from "react";
import NextAuth, { DefaultSession } from "next-auth";

// import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Button from "./Button";

interface Data {
  id: number;
  userEmail: string;
}

// interface Session {
//   data: {
//     user: {
//       email: string;
//     };
//   };
// }

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      email: string;
    } & DefaultSession["user"];
  }
}

const Delete: React.FC<Data> = ({ id, userEmail }) => {
  // console.log("ITEM:", typeof id, "USEREMAIL,:", userEmail);

  const { data: session, status } = useSession();

  const router = useRouter();

  const refreshData = () => {
    router.refresh();
    // router.replace(router.asPath);
  };
  async function deleteHabit() {
    try {
      fetch(`api/habit/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (status === "authenticated" && session.user.email === userEmail) {
    return (
      <div className={styles.wrap}>
        {/* <button
          onClick={deleteHabit}
          // onClick={}
        >
          delete
        </button> */}
        <Button text="delete" onClick={deleteHabit} type="button" />
      </div>
    );
  } else {
    return null;
  }
};

export default Delete;
