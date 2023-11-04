// next redirect and cookies
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import Posts from "@/components/DisplayPost";
import NewPost from "@/components/NewPost";

// Post style import
import "@/styles/homepagePostStyle.css";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Allow auth users to only view this page
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: postsData } = await supabase
    .from("Blogs")
    .select("*, author: profiles(*)")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="block md:flex justify-around mt-10">
        <div className="flex justify-center">
          <NewPost />
        </div>
        <div className="border-solid border-gray-300 md:border-[1px]"></div>
        <Suspense fallback={<p>Loading posts...</p>}>
          <Posts posts={postsData} />
        </Suspense>
      </div>
    </>
  );
}
