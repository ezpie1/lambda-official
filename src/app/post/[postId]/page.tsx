import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

import Like from "@/components/Post/LikeBtn";
import CommentSection from "@/components/Post/CommentSection";

export default async function Page({ params }: { params: { postId: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("Blogs")
    .select("*, author: profiles(*), Likes(user_id)")
    .filter("id", "eq", params.postId);

  // Destructure data and add items - user_liked_post[boolean], likes[length of likes the post has]
  const postInfo =
    data?.map((post) => ({
      ...post,
      user_liked_post: post.Likes.find(
        (like) => like.user_id === session?.user.id
      ),
      likes: post.Likes.length,
    })) ?? [];

  if (postInfo) {
    const post = postInfo[0];

    return (
      <div>
        {/* eslint-disable max-len */}
        <section className="md:flex justify-between md:mx-2 mx-1 my-4 border-solid border-b-2 border-gray-500 pb-10">
          <section
            key={post.id}
            className="border-solid border-2 border-gray-300 p-5 pb-10 md:w-1/2 rounded-md"
          >
            <h1 className="text-3xl font-anonymous mb-8">{post.title}</h1>
            <p className="font-inter">{post.content}</p>
          </section>
          <section className="md:w-1/3 md:mt-0 w-full mt-4">
            <div className="border-solid border-2 border-gray-300 p-5 rounded-md">
              <p>
                <Link href={`/user/${post.author?.username}`}>
                  {post.author?.username}
                </Link>
              </p>
              <p>{post.author?.description}</p>
            </div>
            <div className="flex justify-center md:mt-0 mt-5">
              <Like post={post} />
            </div>
          </section>
        </section>
        <section>
          <CommentSection post={params.postId} />
        </section>
      </div>
    );
  }
}
