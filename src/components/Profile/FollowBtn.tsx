"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  currentProfileUsername: string;
  currentLoggedInUsername: string;
}

/**
 * This is the main button component that handles the following system
 * 
 * @param {currentProfileUsername} string - The username of the current viewing profile user
 * @param {currentLoggedInUsername} string - The username of the current logged in user
 *  
 * @returns JSX.Element
 */

export default function FollowBtn({ currentProfileUsername, currentLoggedInUsername }: Props) {
  // states handle which text is to be displayed depending upon if the logged in user is following or not
  const [isFollowing, setIsFollowing] = useState(false);
  
  const supabase = createClientComponentClient<Database>();

  // need to refresh so that the followers count get's updated
  const router = useRouter();

  /**
   * This arrow function acts as a helper function to check if the current logged in user is already following the current profile user
   */
  const checkIfUserIsAlreadyFollowing = async () => {
    // need to get all pre-following in order to app new following
    let { data: currentFollowing } = await supabase
    .from("profiles")
    .select("following")
    .eq("username", currentLoggedInUsername)
    .single();

    // ignore any[] type implementation
    let followingArray: any[] = [];

    // add a new item to the newFollowingArray and then update the database with the newFollowingArray
    currentFollowing?.following?.forEach((item) => (
      followingArray.push(item)
    ));

    // need to loop though the array to check if the logged in user is following the current profile user
    // ! This is not good as it can cause delays and needs to be checked, but can use for now
    for (let i = 0; i < followingArray.length; i++) {
      if (followingArray[i] == currentProfileUsername) {
        setIsFollowing(true);
      }
      else {
        setIsFollowing(false);
      }
    }
  }

  // check's every time the page reloads if the user is following the current profile user
  useEffect(() => {
    checkIfUserIsAlreadyFollowing();
  }, [])
  

  /**
   * This is the main function that handle's the following mechanism
   * 
   * It takes all the pre following of the current logged in user and updates 
   * them with the new one and does the same thing with the current profile 
   * page user, by updating the current profile user's followers column
   */
  const handleFollow = async () => {    
    // need to get all pre-following in order to add new following
    let { data: currentFollowing } = await supabase
    .from("profiles")
    .select("following")
    .eq("username", currentLoggedInUsername)
    .single();

    // also need to get all the followers of the profile user in order to update
    const { data: currentFollowers } = await supabase
    .from("profiles")
    .select("followers")
    .eq("username", currentProfileUsername)
    .single();

    // only follow if the logged in user is not already following
    if (!isFollowing) {
  
      // ignore any[] type implementation
      let newFollowingArray: any[] = [];
      let newFollowersArray: any[] = [];
  
      // add a new item to the newFollowingArray and then update the database with the newFollowingArray
      currentFollowing?.following?.forEach((item) => (
        newFollowingArray.push(item)
      ));

      // do the same thing with newFollowersArray to update the followers column
      currentFollowers?.followers?.forEach((item) => (
        newFollowersArray.push(item)
      ));
  
      // need to update the 2 arrays with their respective new values and set the isFollowing variable to true, so that the follow button shows `following` text
      newFollowingArray = [...newFollowingArray, currentProfileUsername];
      newFollowersArray = [...newFollowersArray, currentLoggedInUsername];
      setIsFollowing(true);

      // update the logged in user's following column
      const { data: updatedFollowingArray } = await supabase
        .from("profiles")
        .update({following: [...newFollowingArray]})
        .eq("username", currentLoggedInUsername);

      // update the profile user's followers column
      const { data: undatedFollowersArray } = await supabase
      .from("profiles")
      .update({followers: [...newFollowersArray]})
      .eq("username", currentProfileUsername);
    }
    else {
      // the following column won't take a null value, but the chances of getting a null value are negligible
      const updateFollowingArray = (currentFollowing?.following || [])?.filter(item => item != currentProfileUsername);
      const updateFollowersArray = (currentFollowers?.followers || []).filter(item => item != currentLoggedInUsername);

      // after the user un-follow the current profile user we need to change the follow button text to `follow` 
      setIsFollowing(false);

      const { data: updatedFollowingArray } = await supabase
      .from("profiles")
      .update({following: [updateFollowingArray]})
      .eq("username", currentLoggedInUsername);

      const { data: updatedFollowersArray } = await supabase
      .from("profiles")
      .update({followers: [updateFollowersArray]})
      .eq("username", currentProfileUsername);
    }

    // reload the page to update the followers count
    router.refresh();
  }

  return (
    <button className="follow-btn" onClick={() => handleFollow()}>
      {isFollowing ? "Following" : "Follow"}
    </button>
  )
}