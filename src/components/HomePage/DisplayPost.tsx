"use client";

// Importing necessary libraries and hooks
import { Suspense } from "react";

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
          <PostDisplayFunction posts={popularPosts} />
        </Suspense>
      </section>
    </>
  );
}