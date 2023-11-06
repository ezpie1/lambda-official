"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CommentInfo {
  postId: string;
  userId: string;
}

export default function Comment({ postId, userId }: CommentInfo) {
  const [commentData, setCommentData] = useState("");

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { data, error } = await supabase
      .from("comments")
      .insert({ content: commentData, post_id: postId, user_id: userId });
  };

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
  }, [supabase, router]);

  /* eslint-disable max-len */
  return (
    <div className="flex justify-center">
      <form
        className="md:w-1/2 w-3/4"
        onSubmit={(event) => handleComment(event)}
      >
        <input
          type="text"
          placeholder="Comment..."
          className="border-solid border-2 border-gray-300 rounded-md outline-none px-5 py-3 w-3/4"
          onChange={(e) => setCommentData(e.target.value)}
          value={commentData}
        />
        <button type="submit" className="ml-5 comment-btn rounded-lg">
          Comment
        </button>
      </form>
    </div>
  );
}
