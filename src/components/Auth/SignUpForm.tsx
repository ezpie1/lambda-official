"use client";

// Importing necessary libraries and hooks
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { ValidateEmail, ValidateUsername } from "./Validator";

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

  const IsDataValid = async () => {
    const isUsernameValid = await ValidateUsername(username);
    const isEmailValid = await ValidateEmail(userEmail);
    
    if (isUsernameValid && isEmailValid) {
      return true;
    }
    
    return false;
  }

  /**
   * handle's creating a new user with supabase
   *
   * @param {React.FormEvent<HTMLFormElement>} event - the form event
   */
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default functioning of the form
    event.preventDefault();

    // Create a new user with their email and password 
    // store the provided username as meta data
    if (await IsDataValid()) {
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
    }

  };

  return (
    <form
      className="form-holder"
      onSubmit={(event) => handleSignUp(event)}
    >
      <p className="form-inputs">
        <label htmlFor="username">
          Username <span className="warning-text">(Required)</span>
        </label>{" "}
        <br />
        <input
          type="text"
          name="username"
          id="username"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="User_name"
        />
      </p>

      <p className="form-inputs">
        <label htmlFor="email">
          Your Email <span className="warning-text">(Required)</span>
        </label>{" "}
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
          Password <span className="warning-text">(Required)</span>
        </label>{" "}
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
        <button type="submit" className="auth-btn">
          SIGN UP
        </button>
      </div>
    </form>
  );
}
