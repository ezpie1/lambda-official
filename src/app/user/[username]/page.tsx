import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

import Formatter from "@/components/Post/MarkupFormatter";
import FollowCoreBtn from "@/components/Profile/FollowBtnHandler";
import SideBar from "@/components/Banners/SideBar";

import "@/styles/ProfilePage/profilePage.css"; // eslint-disable-line

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
    .select("id, description, username")
    .eq("username", params.username)
    .single();

  // getting the number of followers the current profile user has
  const { data: currentProfileUserFollowers } = await supabase
    .from("profiles")
    .select("followers")
    .eq("username", params.username)
    .single();

  // get current logged in username for the sidebar
  const { data: loggedInUser } = await supabase.auth.getUser()
  const currentLoggedInUsername = loggedInUser.user?.user_metadata.username

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
      <div className="mt-6">
        <nav className="sidebar">
          <SideBar
            loggedInUsername={currentLoggedInUsername}
          />
        </nav>
        <section className="ml-[17rem] md:mr-[10rem]">
          <div className="profile-info">
            <div className="rounded-full user-avatar">
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
            <div className="ml-4 w-1/2">
              <div>
                <p className="font-anonymous text-2xl mb-3 username-details">
                  {user?.username}
                  <span>
                    <FollowCoreBtn currentProfileUsername={params.username} />
                  </span>
                </p>
                <p className="font-inter">{user?.description}</p>
                <p className="follower-count my-5">
                  {currentProfileUserFollowers?.followers?.length} Follower(s)
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            {posts?.map((post) => (
              <Link href={`/post/${post.id}`} key={post.id}>
                <div className="user-post w-full">
                  <p className="font-anonymous text-3xl mb-5">{post.title}</p>
                  <p className="font-inter line-clamp-2">{post.content && <Formatter postContent={post.content} />}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }
}
