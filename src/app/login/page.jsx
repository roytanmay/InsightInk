"use client";

import React from "react";
import styles from "./loginPage.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data, status } = useSession();
  // console.log(data, status);

  const router = useRouter();

  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.social} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
