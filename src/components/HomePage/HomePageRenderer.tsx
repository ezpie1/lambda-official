"use client";

import SideBar from "@/components/Banners/SideBar";
import Posts from "@/components/HomePage/DisplayPost";
import { useState } from "react";

import "@/styles/HomePage/homepage.css"
import "@/styles/HomePage/postStyle.css"

interface HomePageProps {
  popularPosts: postWithAuthor[];
  loggedInUsername: string;
}

export default function HomePage({ popularPosts, loggedInUsername }: HomePageProps) {
  const [isPopularSelected, setIsPopularSelected] = useState(false);

  const DisplayPopular = (isPopularSelected: boolean) => {
    setIsPopularSelected(isPopularSelected)
  }

  return (
    <div className="homepage-wrapper mt-8">
      <nav className="sidebar">
        <SideBar
          ShowPopularPosts={DisplayPopular}
          loggedInUsername={loggedInUsername}
        />
      </nav>
      <RenderedContent popularPostsList={popularPosts || []} displayPopularIfSelected={isPopularSelected} />
    </div>
  )
}

interface Props {
  popularPostsList: postWithAuthor[];
  displayPopularIfSelected: boolean
}

function RenderedContent({ popularPostsList, displayPopularIfSelected }: Props) {
  return (
    <div className="posts-wrapper">
      <Posts
        popularPosts={popularPostsList || []}
        isPopularSelected={displayPopularIfSelected}
      />
    </div>
  );
}
