"use client";

// Importing necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Style
import "@/styles/postStyle.css"
import UserOrganicFeed from "./OrganicFeedGenerator";
import PostDisplayFunction from "./PostDisplayRenderer";

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
  const [latestSelected, setLatestSelected] = useState(false);
  const [feedSelected, setFeedSelected] = useState(true);

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
            className={`post-type-changer ${feedSelected && !latestSelected && 'post-type-changer-selected'}`}
            onClick={() => {
              setLatestSelected(false) 
              setFeedSelected(true)
            }}
          >
            Feed
          </li>
          <li
            className={`post-type-changer ${!feedSelected && latestSelected && 'post-type-changer-selected'}`}
            onClick={() => {
              setLatestSelected(true) 
              setFeedSelected(false)
            }}
          >
            Latest
          </li>
          <li
            className={`post-type-changer ${!feedSelected && !latestSelected && 'post-type-changer-selected'}`}
            onClick={() => {
              setLatestSelected(false) 
              setFeedSelected(false)
            }}
          >
            Popular
          </li>
        </ul>
      </div>
      <Suspense fallback={<p>Loading posts...</p>}>
      <div className="w-[60vw]">
        {feedSelected && !latestSelected && <UserOrganicFeed />}
        {!feedSelected && latestSelected && <PostDisplayFunction posts={latestPosts} />}
        {!feedSelected && !latestSelected && <PostDisplayFunction posts={popularPosts} />}
      </div>
      </Suspense>
    </>
  );
}