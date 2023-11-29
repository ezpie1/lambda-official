// next redirect and cookies
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import Posts from "@/components/DisplayPost";

// Post style import
import "@/styles/homepagePostStyle.css";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Allow auth users to only view this page
  const {
    data: { session },
  } = await supabase.auth.getSession();

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

  return (
    <div className="md:flex mt-10 mx-10 md:justify-between">
      <section className="md:w-1/2 w-full">
        <Suspense fallback={<p>Loading posts...</p>}>
          <Posts
            latestPosts={latestPosts || []}
            popularPosts={popularPosts || []}
          />
        </Suspense>
      </section>
      <section className="md:block hidden">
        <h1 className="info-badge">Coming soon...</h1>
      </section>
    </div>
  );
}
