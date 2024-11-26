"use client";

// importing necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

/**
 * This component is used for the general profile setting
 *
 * @param {Profile} userInfo - Information about the user how's using the settings page
 *
 * @returns JSX.Element
 */
export default function ProfileSettings({ userInfo }: { userInfo: Profile }) {
  // Store's information the user might edit
  const [newUsername, setUsername] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [newEmail, setEmail] = useState("");

  // Connecting supabase
  const supabase = createClientComponentClient<Database>();

  /**
   * This function is used to handle update to the username
   */
  const handleUsernameUpdate = async () => {
    // Update the username column in the profiles table with the new username
    const { error } = await supabase
      .from("profiles")
      .update({ username: newUsername })
      .eq("id", userInfo.id)
      .single();

    // If no error occurred, inform the user
    if (!error) {
      alert("Update successful!");
    }
  };

  /**
   * This function is used to handle update to the description
   */
  const handleDescriptionUpdate = async () => {
    // update the description column on the profiles table for changes
    const { error } = await supabase
      .from("profiles")
      .update({ description: userDescription })
      .eq("id", userInfo.id)
      .single();

    // If no error occurred then inform the user
    if (!error) {
      alert("Update successful!");
    }
  };

  /**
   * This function is used to handle update for the email
   */
  const handleEmailUpdate = async () => {
    // Update the email column in the profiles table for changes
    const { error } = await supabase
      .from("profiles")
      .update({ email: newEmail })
      .eq("id", userInfo.id)
      .single();

    // If no error occurred then inform the user
    if (!error) {
      alert("Update successful!");
    }
  };

  /* eslint-disable max-len */
  return (
    <>
      <h1 className="setting-title text">Profile Setting</h1>
      <div className="mt-5">
        <p>
          <span>
            Username
          </span> <br />
          <span className="flex justify-between md:w-1/2">
            <input
              type="text"
              id="username"
              name="username"
              className="input-field"
              placeholder="Your Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="md:ml-10" onClick={handleUsernameUpdate}>
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
          </span>
          <span className="text-gray-dark text-xs">
            Your username will be visible across the site
          </span>
        </p>
      </div>
      <div className="mt-5">
        <p>
          <span>Bio</span> <br />
          <span className="update-profile flex justify-between md:w-1/2 w-full">
            <textarea
              id="description"
              name="description"
              className="description-field"
              placeholder="Describe yourself"
              onChange={(e) => setUserDescription(e.target.value)}
            />
            <button className="md:ml-10" onClick={handleDescriptionUpdate}>
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
          </span>
          <span className="text-gray-dark text-xs">
            This will be used as your bio across the site
          </span>
        </p>
      </div>

      <div className="mt-5">
        <p>
          <span>Your Email</span> <br />
          <span className="update-profile flex justify-between md:w-1/2 w-full">
            <input
              type="text"
              id="email"
              name="email"
              className="input-field"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="md:ml-10" onClick={handleEmailUpdate}>
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
          </span>
          <span className="text-gray-dark text-xs">
            Your email isn&apos;t displayed across the site, but is used in case
            we need to contact you.
          </span>
        </p>
      </div>
    </>
  );
}
