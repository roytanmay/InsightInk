"use client";

import React from "react";
import styles from "./authLinks.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <Link href="/post">Post</Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;
