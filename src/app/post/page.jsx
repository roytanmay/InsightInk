"use client";

import React, { useEffect, useState } from "react";
import { notification } from "antd";
import styles from "./postPage.module.css";
import Image from "next/image";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostPage = () => {
  const { status } = useSession();
  // console.log(data, status);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      notification["error"]({
        message: `Give it a title!!!`,
        duration: 3,
      });
      return;
    }

    if (value.trim().length == 0) {
      notification["error"]({
        message: `Write something!!!`,
        duration: 3,
      });
      return;
    }

    if (catSlug.length === 0) {
      notification["error"]({
        message: `Select a category`,
        duration: 3,
      });
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug,
      }),
    });

    // console.log(res);

    setValue("");
    setCatSlug("");
    setFile(null);
    setMedia("");
    setTitle("");

    notification["success"]({
      message: `Published!!!`,
      duration: 3,
    });
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
        value={catSlug}
      >
        <option value="culture">culture</option>
        <option value="coding">coding</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="science">science</option>
        <option value="travel">travel</option>
      </select>

      <div className={styles.editor}>
        <div className={styles.add}>
          <input
            type="file"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <button className={styles.addButton}>
            <label htmlFor="image">
              <Image src="/image.png" alt="" width={16} height={16} />
            </label>
          </button>
        </div>

        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Pen your insights..."
          className={styles.textArea}
        />
      </div>

      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default PostPage;
