import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";

import FollowBtn from "./FollowBtn";

interface Props {
  currentProfileUsername: string
}

/**
 * This is the Follow Button wrapper that wraps the FollowBtn as it's child
 * 
 * it only get's the logged in user's username and current profile user's 
 * username and passes those values down to the FollowBtn component
 * 
 * @param {currentProfileUsername} string - the current profile user's 
 * username. This value is passed down to the FollowBtn component
 * @returns 
 */
export default async function FollowCoreBtn({ currentProfileUsername }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  // get the current logged in user
  const { data: { user } } = await supabase.auth.getUser();
  const currentLoggedInUserId = String(user?.id);

  const { data: currentLoggedInUser } = await supabase
  .from("profiles")
  .select("username")
  .eq("id", currentLoggedInUserId)
  .single();

  /* eslint-disable max-len */
  return (
    <FollowBtn currentProfileUsername={currentProfileUsername} currentLoggedInUsername={String(currentLoggedInUser?.username)} />
  )
}