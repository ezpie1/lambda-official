"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Like({ post }: { post: post }) {
  const router = useRouter();

  const handleLikes = async () => {
    const supabase = createClientComponentClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (post.user_liked_post) {
        await supabase
          .from("Likes")
          .delete()
          .match({ user_id: user.id, post_id: post.id });

        router.refresh();
      } else {
        await supabase
          .from("Likes")
          .insert({ user_id: user?.id, post_id: post.id });

        router.refresh();
      }
    }
  };

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
