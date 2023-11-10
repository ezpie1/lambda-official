"use client";

// Importing necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Used for displaying all the posts in the Blogs table
 *
 * @param {post[]} posts - an array of posts
 *
 * @returns JSX.Element
 */
export default function Posts({ posts }: { posts: post[] }) {
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

  return (
    <div className="md:mr-2 mx-2 mt-1 md:w-1/2">
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id}>
          <div className="post-wrapper">
            <p className="text-2xl post-title">{post.title}</p>
            <p className="post-author mt-3">By - {post.author?.username}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
