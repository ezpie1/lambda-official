"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SearchPosts({ posts }: { posts: postWithAuthor[] }) {
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
    <>
      {posts.map((post) => (
        <div className="w-1/2" key={post.id}>
          <Link href={`/post/${post.id}`}>
            <div className="post-wrapper">
              <p className="post-author text-sm">
                <Link href={`/user/${post.author?.username}`}>
                  {post.author?.username}
                </Link>
              </p>
              <p className="post-title">
                {post.title}
              </p>
              <p className="line-clamp-2 post-content">
                {post.content}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
