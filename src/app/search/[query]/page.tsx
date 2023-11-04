import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Posts from "@/components/DisplayPost";

export default async function Page({ params }: { params: { query: string } }) {
  const query = params.query.replace(/-/g, " ");

  const supabase = createServerComponentClient<Database>({ cookies });

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
