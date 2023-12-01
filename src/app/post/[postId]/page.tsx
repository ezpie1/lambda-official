// import necessary libraries
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

// Import the LikeBtn and CommentSection components
import Like from "@/components/Post/LikeBtn";
import CommentSection from "@/components/Post/CommentSection";

// importing stylesheet
import "@/styles/PostPage.css";
import Formatter from "@/components/Post/MarkupFormatter";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

/**
 * Displays the selected posts
 *
 * @param {string} params.postId - the id of the post which is selected
 *
 * @returns JSX.Element
 */
export default async function Page({ params }: { params: { postId: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  // get the current session of the user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get the information about the post which is selected
  const { data } = await supabase
    .from("Blogs")
    .select("*, author: profiles(*), Likes(user_id)")
    .filter("id", "eq", params.postId);

  // Destructure data and add items - user_liked_post[boolean], likes[length of likes the post has]
  const postInfo =
    data?.map((post) => ({
      ...post,
      user_liked_post: post.Likes.some(
        (like) => like.user_id === session?.user.id
      ),
      likes: post.Likes.length,
    })) ?? [];

  if (postInfo) {
    const post = postInfo[0];

    /* eslint-disable max-len */
    return (
      <div>
        <section className="md:flex justify-between md:mx-2 mx-1 my-4 pb-10 post-divider">
          <section className="post p-5 md:w-1/2">
            <div className="mb-10">
              <h1 className="font-anonymous mb-8 lg:text-5xl md:text-4xl text-3xl font-extrabold">
                {post.title}
              </h1>
              <div className="post-content">
                {post.content && <Formatter postContent={post.content} />}
              </div>
            </div>
            <div>
              <Like post={post} />
            </div>
          </section>
          <section className="md:w-1/3 md:mt-0 w-full mt-4 author-info">
            <p className="font-anonymous hover:underline w-fit">
              <Link href={`/user/${post.author?.username}`}>
                {post.author?.username}
              </Link>
            </p>
            <p className="font-inter text-sm text-neural-300">
              {post.author?.description}
            </p>
          </section>
        </section>
        <section>
          <CommentSection post={params.postId} />
        </section>
      </div>
    );
  }
}
