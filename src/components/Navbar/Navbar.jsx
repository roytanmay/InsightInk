import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import AuthLinks from "../AuthLinks/AuthLinks";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">Insight Ink</Link>
      </div>

      <div className={styles.links}>
        <ThemeToggle />
        {/* <Link>Contact</Link>
        <Link>About</Link> */}
        {/* <Link></Link> */}
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
