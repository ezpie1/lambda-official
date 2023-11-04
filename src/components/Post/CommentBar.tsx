"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

interface CommentInfo {
  postId: string;
  userId: string;
}

export default function Comment({ postId, userId }: CommentInfo) {
  const [commentData, setCommentData] = useState("");

  const supabase = createClientComponentClient<Database>();

  const handleComment = async (event: any) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("comments")
      .insert({ content: commentData, post_id: postId, user_id: userId });
  };

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
