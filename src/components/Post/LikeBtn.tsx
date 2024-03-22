"use client";

// Importing necessary libraries
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Like button for adding likes in a post
 *
 * @param {postWithAuthor} post - Information about the post this like button will be used in
 *
 * @returns JSX.Element
 */
export default function Like({ post }: { post: postWithAuthor }) {
  // Setup supabase and router
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // updated for updating the likes column of the current post
  const updateLikesCount = async () => {
    const count = post.likes;
    console.log(count);

    // if user has liked the post, then decrement the likes count
    // else increment the likes count
    if (post.user_liked_post) {
      const newCount = count != null ? count - 1 : count;

      await supabase
        .from("Blogs")
        .update({ likes: newCount })
        .eq("id", post.id);
    } else {
      const newCount = count != null ? count + 1 : count;

      await supabase
        .from("Blogs")
        .update({ likes: newCount })
        .eq("id", post.id);
    }
  };

  // used for adding likes to a post by inserting new in the likes table
  const handleLikes = async () => {
    // Gets data of the current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Checks if we have a user or not
    if (user) {
      // Checks if the user has already liked the post or not, if true, then unlike or else like
      if (post.user_liked_post) {
        // checks which row has the user_id eq to the current user id and which
        // post_id has the id eq to the current post's id
        await supabase
          .from("Likes")
          .delete()
          .match({ user_id: user.id, post_id: post.id });
      } else {
        // add a new like to the post
        await supabase
          .from("Likes")
          .insert({ user_id: user?.id, post_id: post.id });
      }

      // update the likes count as per the user_liked_post variable
      updateLikesCount();
    }
  };

  useEffect(() => {
    const channel = supabase
    .channel("realtime Likes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Likes",
      },
      () => {
        router.refresh();
      }
    )
    .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, router]);

  /* eslint-disable max-len */
  return (
    <button onClick={handleLikes} className="flex items-center group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${
          post.user_liked_post
            ? "fill-red-600 stroke-red-600"
            : "fill-none stroke-gray-400"
        } group-hover:fill-red-600 group-hover:stroke-red-600`}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span
        className={`ml-2 text-sm ${
          post.user_liked_post ? "text-red-600" : "text-gray-400"
        } group-hover:text-red-600`}
      >
        {post.likes}
      </span>
    </button>
  );
}
