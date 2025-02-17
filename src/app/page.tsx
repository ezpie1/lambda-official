// next redirect and cookies
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import HomePage from "@/components/HomePage/HomePageRenderer";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Allow auth users to only view this page
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // this is used to conform if the user viewing the homepage is logged in or not
  if (!session) {
    redirect("/login");
  }

  // get the posts in most liked order
  const { data: popularPosts } = await supabase
    .from("Blogs")
    .select("*, author: profiles(*)")
    .order("likes", { ascending: false });

  // get current logged in username
  const { data: loggedInUser } = await supabase.auth.getUser();
  const userID = loggedInUser.user?.id
  const { data: loggedInUsername } = await supabase
  .from("profiles")
  .select("username")
  .eq("id", String(userID))
  .single();

  const username = String(loggedInUsername?.username)

  /* eslint-disable max-len */
  return (
    <HomePage popularPosts={popularPosts || []} loggedInUsername={username}/>
  );
}