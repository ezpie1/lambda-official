// importing necessary libraries and hooks
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "@/styles/profilePage.css"; // stylesheet
import Link from "next/link";
import Image from "next/image";

import Formatter from "@/components/Post/MarkupFormatter";
import FollowCoreBtn from "@/components/Profile/FollowBtnHandler";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

/**
 * The profile page of a user
 *
 * @param {string} params.username - the username of the user, given in the url
 *
 * @returns JSX.Element
 */
export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  // Connect to supabase
  const supabase = createServerComponentClient<Database>({ cookies });

  // Get information about the user, using their username
  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  // getting the number of followers the current profile user has
  const { data: currentProfileUserFollowers } = await supabase
  .from("profiles")
  .select("followers")
  .eq("username", params.username)
  .single();

  // If we have the information then continue
  if (user) {
    // Get the posts written by the user in descending order
    const { data: posts } = await supabase
      .from("Blogs")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    /* eslint-disable max-len */
    return (
      <div className="block md:flex h-max my-9">
        <div className="md:w-1/2 md:h-screen profile-info md:flex-col flex-row">
          <div className="md:mb-10 rounded-full user-avatar">
            <div className="avatar-preview">
              <Image
                src="/icons/profile-icon.svg"
                alt="User avatar"
                className="avatar-wrapper"
                width={100}
                height={100}
              ></Image>
            </div>
          </div>
          <div className="md:px-5 ml-2">
            <div>
              <p className="font-anonymous text-2xl mb-3">
                {user?.username}
              </p>
              <p className="font-inter">{user?.description}</p>
              <p className="follower-count my-5">
                {currentProfileUserFollowers?.followers?.length} Followers
              </p>
            </div>
            <div>
              <FollowCoreBtn currentProfileUsername={params.username}/>
            </div>
          </div>
        </div>
        <div className="mx-5 md:mt-0 mt-5 md:w-full">
          {posts?.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div className="user-post w-full h-40">
                <p className="font-anonymous text-3xl mb-5">{post.title}</p>
                <p className="font-inter line-clamp-2">{post.content && <Formatter postContent={post.content} />}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
