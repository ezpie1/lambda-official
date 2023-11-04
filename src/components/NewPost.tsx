import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewPost() {
  const addPost = async (formData: FormData) => {
    "use server";

    const title: string = String(formData.get("title"));
    const content: string = String(formData.get("content"));

    const supabase = createServerActionClient<Database>({ cookies });

    if (title && content) {
      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // If user exist then only add post to the Blogs table
      if (user) {
        await supabase
          .from("Blogs")
          .insert({ content, title, user_id: user.id });
      }
    }
  };

  return (
    <form action={addPost}>
      <p>
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          name="title"
          className="outline-none border-solid border-2 border-black rounded-md"
        />
      </p>

      <p>
        <label htmlFor="content">Content</label> <br />
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={10}
          className="rounded-md resize-none border-solid border-2 border-black"
        ></textarea>
      </p>

      <div className="flex justify-center">
        <button type="submit" className="post-btn">
          Post
        </button>
      </div>
    </form>
  );
}
