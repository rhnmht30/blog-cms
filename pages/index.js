import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";

export default function Home({ blogs, projects }) {
  const [secret, setSecret] = React.useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://rhnmmht30.dev">blog</a> cms
        </h1>

        <input
          className={styles.secret}
          type="text"
          placeholder="enter preview secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />

        <h2>Blogs</h2>
        <ul>
          {blogs.map((b, i) => (
            <li key={i}>
              {b}{" "}
              {secret !== "" ? (
                <a
                  className={styles.link}
                  target="_blank"
                  href={`https://rhnmht30.dev/api/preview?secret=${secret}&type=blog&slug=${b}`}
                >
                  preview
                </a>
              ) : null}
            </li>
          ))}
        </ul>
        <h2>Projects</h2>
        <ul>
          {projects.map((p, i) => (
            <li key={i}>
              {p}{" "}
              {secret !== "" ? (
                <a
                  className={styles.link}
                  target="_blank"
                  href={`https://rhnmht30.dev/api/preview?secret=${secret}&type=projects&slug=${p}`}
                >
                  preview
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  let blogs = fs.readdirSync(path.join(process.cwd(), "data", "blog"));
  let projects = fs.readdirSync(path.join(process.cwd(), "data", "projects"));

  blogs = blogs.map((b) => b.replace(".mdx", ""));
  projects = projects.map((b) => b.replace(".mdx", ""));

  return {
    props: {
      blogs,
      projects,
    },
  };
}
