import "@/styles/commentSection.css";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

import Comment from "./CommentBar";

export default async function CommentSection({ post }: { post: string }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const postId = post;

  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  const { data: user } = await supabase.auth.getUser();
  const userId = user.user?.id;

  /* eslint-disable max-len */
  return (
    <div>
      <section>
        {userId ? (
          <Comment postId={postId} userId={userId} />
        ) : (
          <p>Ops! Refresh</p>
        )}
      </section>
      <section className="mt-36">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex mt-5 items-center">
            <section>
              <Image
                src="https://ezpie.vercel.app/favicon.svg"
                alt="user avatar"
                width={100}
                height={100}
                className="border-solid border-2 border-gray-400 rounded-full"
              />
            </section>
            <section className="ml-3 border-solid border-2 border-gray-300 px-5 py-2 w-1/2 rounded-md">
              <p className="font-anonymous mb-3">
                <Link href={`/user/${comment.profiles?.username}`}>
                  {comment.profiles?.username}
                </Link>
              </p>
              <p className="font-inter">{comment.content}</p>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}
