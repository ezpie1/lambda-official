"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedQuery = searchQuery.split(" ").join("-");
    router.push(`/search/${formattedQuery}`);
  };

  return (
    <form className="search-bar" onSubmit={(event) => handleSearch(event)}>
      <input
        type="text"
        placeholder="Search..."
        className="search-field"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="search-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}
