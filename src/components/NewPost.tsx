"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

// import stylesheet
import "@/styles/newPostPage.css";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

/**
 * NewPost component for the application
 * @returns JSX.Element
 */
export default function NewPost() {
  // the title and content of the post
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  /**
   * Function to add a new post
   */
  const addPost = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent all default actions from occurring
    event.preventDefault();

    // Fetching the user
    const {
      data: { user },
    } = await supabase.auth.getUser();


    // need to get the username of author for `author` column
    const { data: author } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", String(user?.id))
      .single();

    // If user exists, then only add post to the Blogs table
    if (user) {
      const { status } = await supabase.from("Blogs").insert({
        content: postContent,
        title: postTitle,
        user_id: user.id,
        author: author?.username,
        likes: 0,
      });

      if (status === 201) {
        // get the newly added post's id and redirect the user to it
        const { data: post } = await supabase
          .from("Blogs")
          .select("id")
          .eq("title", postTitle)
          .single();

        router.push(`/post/${post?.id}`);
      }
    }
  };

  // Returns the new post form JSX
  return (
    <form onSubmit={addPost}>
      <div className="post-form p-5 sm:w-[50vw] w-full">
        <p>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Post title..."
            className="meta-data mb-5 meta-data-title font-inter"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </p>

        <p>
          <textarea
            placeholder="Post content goes here..."
            name="content"
            id="content"
            className="meta-data meta-data-content"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        </p>
      </div>

      <button type="submit" className="post-btn" test-data="submitBtn">
        Post
      </button>
    </form>
  );
}
