import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LogInForm from "@/components/Auth/LogInForm";
import Separator from "@/components/form/separator";

// StyleSheet used for styling the form
import "@/styles/auth/auth.css";

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
    <div className="flex mx-9 mt-16 justify-between">
      <div className="default-text">
        <section>
          <h1 className="main-text">Privatus</h1>
          <p>The Social Media App</p>
          <p>That values privacy</p>
        </section>
        <section className="grid mt-16">
          <p>It&apos;s <span className="main-text">Open-source</span></p>
          <p className="justify-self-center">and</p>
          <p className="main-text justify-self-center">Privacy based</p>
        </section>
      </div>
      <div className="w-1/2">
        <LogInForm />
        <Separator displayText="SignUp" redirectLink="signup" />
      </div>
    </div>
  );
}
