
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

import Comment from "@/components/Post/CommentBar";

import "@/styles/PostPage/commentSection.css"; // eslint-disable-line

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

/* eslint-disable max-len */
/**
 * This is the comment section component that renders the CommentBar component and other JSX.Element
 *
 * @param {string} post - the id of which the comment section belong to, used by CommentBar component
 *
 * @returns JSX.Element
 */
/* eslint-enable max-len */
export default async function CommentSection({ post }: { post: string }) {
  // Setup supabase connection
  const supabase = createServerComponentClient<Database>({ cookies });

  // converting variable name from post to postId - Making more sense
  const postId = post;

  // Get all the comments that are related with respect to postId
  // ! Should be in order of latest to oldest
  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  // * Getting user id for CommentBar component
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user?.id;

  /* eslint-disable max-len */
  return (
    <>
      <section>
        {userId ? (
          <Comment postId={postId} userId={userId} />
        ) : (
          <p>Ops! Refresh</p>
        )}
      </section>
      <section>
        {comments?.map((comment) => (
          <div key={comment.id} className="flex mt-5 items-center">
            <section>
              <Image
                src="/icons/profile-icon.svg"
                alt="user avatar"
                width={100}
                height={100}
                className="border-solid border-2 border-gray-400 rounded-full"
              />
            </section>
            <section className="ml-3 w-1/2">
              <p className="font-anonymous mb-3 hover:underline w-fit">
                <Link href={`/user/${comment.profiles?.username}`}>
                  {comment.profiles?.username}
                </Link>
              </p>
              <p className="font-inter">{comment.content}</p>
            </section>
          </div>
        ))}
      </section>
    </>
  );
}
