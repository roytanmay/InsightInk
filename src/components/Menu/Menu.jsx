import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../MenuPosts/MenuPosts";

const Menu = () => {
  return (
    <div className={styles.container}>
      {/* Most popular */}
      <h2 className={styles.subTitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts />
    </div>
  );
};

export default Menu;
