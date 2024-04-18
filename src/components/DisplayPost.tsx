"use client";

// Importing necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Style
import "@/styles/postStyle.css"
import Formatter from "./Post/MarkupFormatter";

// an interface for latest and popular posts types
interface Props {
  latestPosts: postWithAuthor[];
  popularPosts: postWithAuthor[];
}

/**
 * Used for displaying all the posts in the Blogs table
 *
 * @param {postWithAuthor[]} latestPosts - All the posts in latest to oldest order
 * @param {postWithAuthor[]} popularPosts - All the posts in most liked to least liked
 *
 * @returns JSX.Element
 */
export default function Posts({ latestPosts, popularPosts }: Props) {
  const [latestSelected, setLatestSelected] = useState(true);

  // Setup supabase and router
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Subscribe to realtime update for the Blogs table
  useEffect(() => {
    const channel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Blogs",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  /* eslint-disable max-len */
  return (
    <>
      <div className="mb-16 w-[50vw]">
        <ul className="flex text-sm">
          <li
            className={`post-type-changer ${latestSelected && 'post-type-changer-selected'}`}
            onClick={() => setLatestSelected(true)}
          >
            Latest
          </li>
          <li
            className={`post-type-changer ${!latestSelected && 'post-type-changer-selected'}`}
            onClick={() => setLatestSelected(false)}
          >
            Popular
          </li>
        </ul>
      </div>
      <div className="w-[60vw]">
        {latestSelected ? (
          <PostDisplayFunction posts={latestPosts} />
        ) : (
          <PostDisplayFunction posts={popularPosts} />
        )}
      </div>
    </>
  );
}

function PostDisplayFunction({ posts }: { posts: postWithAuthor[] }) {
  return (
    <>
      {posts.map((post) => (
        <div className="post-container" key={post.id} >
          <Link href={`/post/${post.id}`} test-data="posts">
            <div className="post-wrapper">
              <p className="post-author text-sm">
                {post.author?.username}
              </p>
              <p className="post-title" test-data="postTitle">
                {post.title}
              </p>
              <p className="line-clamp-2 post-content">
                {post.content && <Formatter postContent={post.content} />}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
