// importing necessary libraries
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Suspense } from "react";
import { cookies } from "next/headers";

// importing the DisplayPost component
import SearchPosts from "./SearchResultPosts";

// importing stylesheet
import "@/styles/searchResultPage.css";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

/**
 * The search result page done by user
 *
 * @param {string} params.query - the search query of the user
 *
 * @returns JSX.Element
 */
export default async function Page({ params }: { params: { query: string } }) {
  // format the query to replace spaces(" ") with dashes("-")
  const query = params.query.replace(/-/g, " ");

  // Connect to supabase
  const supabase = createServerComponentClient<Database>({ cookies });

  // Get the posts that have the title similar to the search query
  const { data: posts } = await supabase
    .from("Blogs")
    .select("*, author: profiles(*)")
    .ilike("title", `%${query}%`)
    .order("created_at", { ascending: false });

  if (posts) {
    return (
        <div className="m-12 flex flex-col items-center">
          <Suspense fallback={<p>Loading posts...</p>}>
            <SearchPosts posts={posts}/>
          </Suspense>
        </div>
      );
  }
}
