"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import "@/styles/Banner/sidebar.css"

interface Props {
  ShowPopularPosts?: (isSelected: boolean) => void;
  loggedInUsername: string;
}

export default function SideBar({ ShowPopularPosts, loggedInUsername }: Props) {
  const [isFeedSelected, setFeedSelected] = useState(true);
  const [isPopularSelected, setPopularSelected] = useState(false);
  const [followingArray, setFollowingArray] = useState<string[]>([]);

  const supabase = createClientComponentClient<Database>();

  const getFollowingArray = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("following")
      .eq("username", loggedInUsername)
      .single();

    if (data?.following) {
      setFollowingArray(data.following as string[])
    }
  }

  useEffect(() => {
    getFollowingArray();
  })

  if (ShowPopularPosts) {

    return (
      <>
        <section>
          <ul className="nav-options">
            <li
              className={`nav-option ${isFeedSelected && "option-selected"}`}
              onClick={() => {
                setFeedSelected(true);
                setPopularSelected(false);
                ShowPopularPosts(false);
              }
              }>
              Feed
            </li>
            <li
              className={`nav-option ${isPopularSelected && "option-selected"}`}
              onClick={() => {
                setFeedSelected(false);
                setPopularSelected(true);
                ShowPopularPosts(true);
              }
              }>
              Popular
            </li>
            <li className="nav-option">
              <Link href={`/user/${loggedInUsername}`}>
                Profile
              </Link>
            </li>
            <li className="nav-option">
              <Link href="/settings/profile">
                Settings
              </Link>
            </li>
          </ul>
        </section>
        <section className="grid gap-y-7">
          <h1 className="header">Following</h1>
          <ul>
            {followingArray.length > 0 ? (
              followingArray.map((username: string, index: number) => (
                <a href={`/user/${username}`} key={index}>
                  <li className="flex items-center">
                    <Image
                      src="/icons/profile-icon.svg"
                      alt="This profile pic"
                      width={75}
                      height={75}
                    />
                    <span>{username}</span>
                  </li>
                </a>
              ))
            ) : (
              <p>You’re not following anyone.</p>
            )}
          </ul>
        </section>
      </>
    )
  } else {
    return (
      <>
        <section>
          <ul className="nav-options">
            <li
              className="nav-option"
            >
              <Link href={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-option">
              <Link href={`/user/${loggedInUsername}`}>
                Profile
              </Link>
            </li>
            <li className="nav-option">
              <Link href={"/settings/profile"}>
                Settings
              </Link>
            </li>
          </ul>
        </section>
        <section className="grid gap-y-7">
          <h1 className="header">Following</h1>
          <ul>
            {followingArray.length > 0 ? (
              followingArray.map((username: string, index: number) => (
                <a href={`/user/${username}`} key={index}>
                  <li className="flex items-center">
                    <Image
                      src="/icons/profile-icon.svg"
                      alt="This profile pic"
                      width={75}
                      height={75}
                    />
                    <span>{username}</span>
                  </li>
                </a>
              ))
            ) : (
              <p>You’re not following anyone.</p>
            )}
          </ul>
        </section>
      </>
    )
  }
}