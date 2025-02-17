"use client";

import Link from "next/link";

import Like from "@/components/Post/LikeBtn";
import Formatter from "@/components/Post/MarkupFormatter";
import SideBar from "@/components/Banners/SideBar";

import "@/styles/PostPage/PostPage.css";

interface Props {
  post: postWithAuthor;
  loggedInUsername: string | undefined;
}

export default function PostRenderer({ post, loggedInUsername }: Props) {

  return (
    <>
      <nav className="sidebar">
        <SideBar
          loggedInUsername={String(loggedInUsername)}
        />
      </nav>
      <section className="post p-5">
        <div className="mb-10">
          <h1 className="font-anonymous mb-8 text-2xl font-extrabold">
            {post.title}
          </h1>
          <div className="post-content">
            {post.content && <Formatter postContent={post.content} />}
          </div>
        </div>
        <div>
          <Like post={post} />
        </div>
      </section>
      <section className="w-80">
        <p>
          <Link
            href={`/user/${post.author?.username}`}
            className="font-anonymous hover:underline"
          >
            {post.author?.username}
          </Link>
        </p>
        <p className="font-inter text-sm text-neural-300">
          {post.author?.description}
        </p>
      </section>
    </>
  )
}