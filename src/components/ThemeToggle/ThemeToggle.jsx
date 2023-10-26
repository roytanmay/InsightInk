"use client";

import React, { useContext } from "react";
import styles from "./themeToggle.module.css";
import Image from "next/image";
import { ThemeContext, useThemeContext } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggle } = useContext(ThemeContext);
  // console.log(theme);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark" ? { background: "white" } : { background: "#0f172a" }
      }
    >
      <Image src="/moon.png" alt="dark" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <Image src="/sun.png" alt="light" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
