"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

interface Props {
  Clicked: () => void;
}

export default function SignUpForm({ Clicked }: Props) {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const supabase = createClientComponentClient();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          username: username,
        },
      },
    });

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
        <button type="submit" className="auth-btn text-xl" onClick={Clicked}>
          SIGN UP
        </button>
      </div>
    </form>
  );
}
