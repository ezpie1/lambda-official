"use client";

// Importing necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

/**
 * The signup form is used for creating a new user
 *
 * @returns JSX.Element
 */
export default function SignUpForm() {
  // data provided by the user - username, email and password
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Connect to supabase
  const supabase = createClientComponentClient();

  /**
   * handle's creating a new user with supabase
   *
   * @param {React.FormEvent<HTMLFormElement>} event - the form event
   */
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default functioning of the form
    event.preventDefault();

    // Create a new user with their email and password, store their provided
    // username and email as meta data
    const { data } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          username: username,
          email: userEmail,
        },
      },
    });

    // If signup was successful then inform the user to check their email
    if (data) {
      alert("Check your Email for verification");
    } else {
      alert("Ops! Try again");
    }
  };

  return (
    <form
      className="form md:w-3/4 w-full"
      onSubmit={(event) => handleSignUp(event)}
    >
      <p>
        <label htmlFor="username">
          Your Name <span className="text-red-color">(Required)</span>
        </label>{" "}
        <br />
        <input
          type="text"
          name="username"
          id="username"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </p>

      <p>
        <label htmlFor="email">
          Your Email <span className="text-red-color">(Required)</span>
        </label>{" "}
        <br />
        <input
          type="email"
          name="email"
          id="email"
          className="input"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
        />
      </p>

      <p>
        <label htmlFor="password">
          Password <span className="text-red-color">(Required)</span>
        </label>{" "}
        <br />
        <input
          type="password"
          name="password"
          id="password"
          className="input"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
        />
      </p>

      <div className="flex justify-center">
        <button type="submit" className="auth-btn text-xl">
          SIGN UP
        </button>
      </div>
    </form>
  );
}
