"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

interface Props {
  Clicked: () => void;
}

export default function LogInForm({ Clicked }: Props) {
  const [userEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");

  const supabase = createClientComponentClient();

  const handleLogIn = async (event: any) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: UserPassword,
    });

    if (data) {
      alert("Welcome Back!");
    } else {
      alert("Ops! Try again");
    }
  };

  return (
    <form
      className="form md:w-3/4 w-full"
      onSubmit={(event) => handleLogIn(event)}
    >
      <p>
        <label htmlFor="email">
          Your Email <span className="text-red-color">(Required)</span>
        </label>
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
        </label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          className="input"
          onChange={(e) => setUserPassword(e.target.value)}
          value={UserPassword}
        />
      </p>

      <div className="flex justify-center">
        <button className="auth-btn text-xl" onClick={Clicked}>
          LogIn
        </button>
      </div>
    </form>
  );
}
