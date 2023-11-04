"use client";

import SignUpForm from "@/components/Auth/SignUpForm";
import Message from "@/components/Banners/Message";
import Separator from "@/components/form/separator";

// Stylesheet for styling the form with custom styles
import "@/styles/form.css";
import { useState } from "react";

export default function SignUp() {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(true);
  };

  return (
    <div>
      <div className={showInfo ? "block" : "hidden"}>
        <Message type="success">
          Info: Please check your email for verification link
        </Message>
      </div>
      <div className="block form-wrapper">
        <h1 className="text-4xl">SignUp for a Lambda Account</h1>
        <SignUpForm Clicked={handleClick} />
        <Separator displayText="LogIn" redirectLink="login" />
      </div>
    </div>
  );
}
