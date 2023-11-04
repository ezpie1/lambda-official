"use client";

// Components used in the login page
import LogInForm from "@/components/Auth/LogInForm";
import Separator from "@/components/form/separator";
import Message from "@/components/Banners/Message";

import { useState } from "react";

// StyleSheet used for styling the form
import "@/styles/form.css";

export default function LogIn() {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(true);
  };

  return (
    <div>
      <div className={showInfo ? "block" : "hidden"}>
        <Message type="success">Info: Welcome Back!</Message>
      </div>
      <div className="form-wrapper">
        <h1 className="text-4xl">LogIn Using Your Lambda Account</h1>
        <LogInForm Clicked={handleClick} />
        <Separator displayText="SignUp" redirectLink="signup" />
      </div>
    </div>
  );
}
