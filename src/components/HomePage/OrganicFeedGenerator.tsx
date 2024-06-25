import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import PostDisplayFunction from "./PostDisplayRenderer";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// dynamically importing the PostDisplayFunction component
//! It's a function
/* eslint-disable @typescript-eslint/naming-convention */
const PostDisplayFunction = dynamic(() => import("./PostDisplayRenderer"));

export default async function UserOrganicFeed() {
  const supabase = createClientComponentClient<Database>();

  // Needed for getting the logged in user's `following` array from the database
  const { data: { user } } = await supabase.auth.getUser();
  const loggedInUserId = user?.id;

  const { data } = await supabase
  .from("profiles")
  .select("following")
  .eq("id", String(loggedInUserId));

  // the current logged in user's following data
  // this works mainly because the json returned from the database is an object
  // with the `following` array at the 0th index
  const loggedInUsersFollowingData = data?.at(0)?.following;

  const followingUsersPosts: postWithAuthor[] = [];
  // TypeScript... don't ask
  if (loggedInUsersFollowingData) {    
    for (let i = 0; i < loggedInUsersFollowingData.length; i++) {
      const { data } = await supabase
      .from("Blogs")
      .select("*, author: profiles(*)")
      .eq("author", String(loggedInUsersFollowingData[i]));
  
      followingUsersPosts.push(...data ?? []);
    }
  
    // this helps sort the array in descending order with latest posts on top
    /* eslint-disable max-len */
    followingUsersPosts.sort((a, b) =>  new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // TODO: Display only top 10 posts for preventing latency and add more on reaching end
  }

  /* eslint-disable max-len */
  return (
    <>
      <Suspense fallback={<p>Building Feed Please wait</p>}>
        {loggedInUsersFollowingData && <PostDisplayFunction posts={followingUsersPosts} />}
      </Suspense>
    </>
  )
}