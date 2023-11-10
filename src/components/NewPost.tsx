import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

/**
 * NewPost component for the application
 * @returns JSX.Element
 */
export default function NewPost() {
  /**
   * Function to add a new post
   * @param {FormData} formData - The form data
   */
  const addPost = async (formData: FormData) => {
    "use server";

    // Extracting title and content from the form data
    const title: string = String(formData.get("title"));
    const content: string = String(formData.get("content"));

    // Creating a Supabase client
    const supabase = createServerActionClient<Database>({ cookies });

    // Checking if title and content are not empty
    if (title && content) {
      // Fetching the user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // If user exists, then only add post to the Blogs table
      if (user) {
        await supabase
          .from("Blogs")
          .insert({ content, title, user_id: user.id });
      }
    }
  };

  // Returns the new post form JSX
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
