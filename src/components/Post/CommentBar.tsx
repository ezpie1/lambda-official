"use client";

// Import necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * {string} postId - the id of the post which the new comment belongs to
 * {string} userId - the id of the user who added the new comment
 */
interface CommentInfo {
  postId: string;
  userId: string;
}

/**
 * Comment Bar component is used for commenting on posts
 *
 * @param {string} postId - the id of the post which the new comment belongs to
 * @param {string} userId - the id of the user who added the new comment
 *
 * @returns JSX.Element
 */
export default function Comment({ postId, userId }: CommentInfo) {
  // commentData - The content of the comment
  const [commentData, setCommentData] = useState("");

  // Setup supabase and router
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  /**
   * Used for inserting a new row in the comments table for new comment
   *
   * @param {React.FormEvent<HTMLFormElement>} event - the form event
   */
  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { data, error } = await supabase
      .from("comments")
      .insert({ content: commentData, post_id: postId, user_id: userId });
  };

  // Subscribing to realtime update in the comments table
  useEffect(() => {
    const channel = supabase
      .channel("realtime comments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]); // Uses supabase and router for checking changes

  /* eslint-disable max-len */
  return (
      <form 
      className="flex flex-row gap-4 w-full"
      onSubmit={(event) => handleComment(event)}
      >
        <input
          type="text"
          placeholder="Comment..."
          className="shadow-xl rounded-md outline-none px-5 py-3 sm:w-1/2"
          onChange={(e) => setCommentData(e.target.value)}
          value={commentData}
        />
        <button type="submit" className="comment-btn">
          Comment
        </button>
      </form>
  );
}
