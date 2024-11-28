// import necessary libraries
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Import the LikeBtn and CommentSection components
import CommentSection from "@/components/Post/CommentSection";
import PostRenderer from "./PostPageRenderer";

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

  // used by the PostRenderer component
  const {data: currentLoggedInUsernameArray} = await supabase
  .from("profiles")
  .select("username")
  .eq("id", String(session?.user.id))
  .single();

  // the returned data is an object - {username: name} 
  // For example - {username: "tester1"}
  const currentLoggedInUsername = currentLoggedInUsernameArray?.username;

  if (postInfo) {
    const post = postInfo[0];

    /* eslint-disable max-len */
    return (
      <div>
        <section className="md:flex justify-between md:mx-2 mx-1 my-4 pb-10 post-divider">
          <PostRenderer post={post} loggedInUsername={currentLoggedInUsername}/>
        </section>
        <section className="ml-[17rem]">
          <CommentSection post={params.postId} />
        </section>
      </div>
    );
  }
}
