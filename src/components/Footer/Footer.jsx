import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <hr className={styles.hr} />
      <p>&copy; {new Date().getFullYear()} Insight Ink</p>
    </div>
  );
};

export default Footer;
