"use client";

// Importing necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

/**
 * The Login Form for logging a user
 *
 * @returns JSX.Element
 */
export default function LogInForm() {
  // The email and password of which the user inserts
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Connect supabase
  const supabase = createClientComponentClient();

  /**
   * Handle's the logging in of a user
   *
   * @param {React.FormEvent<HTMLFormElement>} event - the form event
   */
  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default functioning of the form element
    event.preventDefault();

    // Login the user with their email and password
    const { data } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    // If the login worked inform the user about it and ask to refresh
    if (data) {
      alert("Welcome Back! Please refresh to head back");
    } else {
      alert("Ops! Try again");
    }
  };

  return (
    <form
      className="form-holder"
      onSubmit={(event) => handleLogIn(event)}
    >
      <p className="form-inputs">
        <label htmlFor="email">
          Your Email
        </label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          className="input"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          placeholder="Your Email..."
        />
      </p>

      <p className="form-inputs">
        <label htmlFor="password">
          Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          className="input"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          placeholder="********"
        />
      </p>

      <div className="flex justify-center">
        <button className="auth-btn">
          LogIn
        </button>
      </div>
    </form>
  );
}
