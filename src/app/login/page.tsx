import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LogInForm from "@/components/Auth/LogInForm";
import Separator from "@/components/form/separator";

// StyleSheet used for styling the form
import "@/styles/form.css";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

export default async function LogIn() {
  const supabase = createServerComponentClient({ cookies });

  const { data: session } = await supabase.auth.getSession();

  // Check if user has a session and redirect user to homepage
  if (session.session != null) {
    redirect("/");
  }

  return (
    <div>
      <div className="form-wrapper">
        <h1 className="text-4xl">LogIn Using Your Lambda Account</h1>
        <LogInForm />
        <Separator displayText="SignUp" redirectLink="signup" />
      </div>
    </div>
  );
}
