// next redirect and cookies
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import Posts from "@/components/HomePage/DisplayPost";

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

  // get the posts in latest order
  const { data: latestPosts } = await supabase
    .from("Blogs")
    .select("*, author: profiles(*)")
    .order("created_at", { ascending: false });

  // get the posts in most liked order
  const { data: popularPosts } = await supabase
    .from("Blogs")
    .select("*, author: profiles(*)")
    .order("likes", { ascending: false });

  /* eslint-disable max-len */
  return (
    <RenderedContent latestPostsList={latestPosts || []} popularPostsList={popularPosts || []} />
  );
}

function RenderedContent({latestPostsList, popularPostsList}: {latestPostsList: postWithAuthor[], popularPostsList: postWithAuthor[]}) {
  return (
    <div className="m-12 flex flex-col items-center">
      <Posts
        latestPosts={latestPostsList || []}
        popularPosts={popularPostsList || []}
      />
    </div>
  );
}
