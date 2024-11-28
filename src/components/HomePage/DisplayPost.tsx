"use client";

// Importing necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

import UserOrganicFeed from "./OrganicFeedGenerator";
import PostDisplayFunction from "./PostDisplayRenderer";

// an interface for latest and popular posts types
interface Props {
  popularPosts: postWithAuthor[];
  isPopularSelected: boolean;
}

/**
 * Used for displaying all the posts in the Blogs table
 *
 * @param {postWithAuthor[]} popularPosts - All the posts in most liked to least liked
 *
 * @returns JSX.Element
 */
export default function Posts({ popularPosts, isPopularSelected }: Props) {

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
      <section className={`posts ${isPopularSelected && 'hidden'}`}>
        <Suspense fallback={<p>Loading feed...</p>}>
          <UserOrganicFeed />
        </Suspense>
      </section>
      <section className={`posts ${!isPopularSelected && 'hidden'}`}>
        <Suspense fallback={<p>Loading posts...</p>}>
          <PostDisplayFunction posts={popularPosts}/>
        </Suspense>
      </section>
    </>
  );
}