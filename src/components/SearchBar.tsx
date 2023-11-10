"use client";

// Importing necessary libraries and hooks
import { useRouter } from "next/navigation";
import React, { useState } from "react";

/**
 * Search bar component for the app
 * @returns JSX.Element
 */
export default function Search() {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Next.js router
  const router = useRouter();

  /**
   * Handles the search operation
   * @param {React.FormEvent<HTMLFormElement>} event - The form event
   */
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents the default form submission
    event.preventDefault();

    // Formats the search query by replacing spaces with hyphens
    const formattedQuery = searchQuery.split(" ").join("-");

    // Navigates to the search page with the formatted query
    router.push(`/search/${formattedQuery}`);
  };

  // Returns the search bar JSX
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
