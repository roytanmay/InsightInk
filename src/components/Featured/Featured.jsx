import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`https://insight-ink-one.vercel.app/api/posts/random`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch!!");
  }

  return res.json();
};

const Featured = async () => {
  const post = await getData();
  // console.log(post);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b className={styles.bold}>Welcome!</b> Explore stories and creative
        ideas.
      </h1>

      <div className={styles.post}>
        {post?.img && (
          <div className={styles.imageContainer}>
            <Image
              src={post.img}
              alt="featured-image"
              fill
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <p className={styles.postDesc}>{post.desc.substring(0, 200)}...</p>
          <button className={styles.button}>
            <Link href={`/posts/${post.slug}`}>Read More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
