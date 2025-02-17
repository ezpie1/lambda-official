"use client";

import { useState } from "react";

import SideBar from "@/components/Banners/SideBar";
import Posts from "@/components/HomePage/DisplayPost";

import "@/styles/HomePage/homepage.css"
import "@/styles/HomePage/postStyle.css"

interface HomePageProps {
  popularPosts: postWithAuthor[];
  loggedInUsername: string;
}

export default function HomePage({ popularPosts, loggedInUsername }: HomePageProps) { // eslint-disable-line max-len

  const [isPopularSelected, setIsPopularSelected] = useState(false);

  const displayPopular = (isPopularSelected: boolean) => {
    setIsPopularSelected(isPopularSelected)
  }

  /* eslint-disable */
  return (
    <div className="homepage-wrapper mt-8">
      <nav className="sidebar">
        <SideBar
          ShowPopularPosts={displayPopular}
          loggedInUsername={loggedInUsername}
        />
      </nav>
      <RenderedContent popularPostsList={popularPosts || []} displayPopularIfSelected={isPopularSelected} />
    </div>
  )
  /* eslint-enable */
}

interface Props {
  popularPostsList: postWithAuthor[];
  displayPopularIfSelected: boolean
}

function RenderedContent({ popularPostsList, displayPopularIfSelected }: Props) { // eslint-disable-line
  return (
    <div className="posts-wrapper">
      <Posts
        popularPosts={popularPostsList || []}
        isPopularSelected={displayPopularIfSelected}
      />
    </div>
  );
}
