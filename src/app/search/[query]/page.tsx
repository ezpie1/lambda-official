// importing necessary libraries
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// importing the DisplayPost component
import Posts from "@/components/DisplayPost";

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
  const { data: posts, error } = await supabase
    .from("Blogs")
    .select("*, author: profiles(*)")
    .ilike("title", `%${query}%`)
    .order("created_at", { ascending: false });

  if (posts) {
    return (
      <div className="flex mt-10 justify-center">
        <Posts posts={posts} />
      </div>
    );
  } else {
    console.log(error);
  }
}
