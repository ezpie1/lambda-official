"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Posts({ posts }: { posts: post[] }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

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
            <p className="post-author mt-3">By - {post.author.username}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
