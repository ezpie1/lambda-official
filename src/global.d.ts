import { Database as DB } from "./lib/supabase.type";

type Post = DB["public"]["Tables"]["Blogs"]["Row"];
type MicroBlog = DB["public"]["Tables"]["microblog"]["Row"];

declare global {
  type Database = DB;

  type Profile = DB["public"]["Tables"]["profiles"]["Row"];

  type postWithAuthor = Post & {
    author: Profile | null;
    user_liked_post?: boolean;
    likes?: number | null;
  };

  type microBlogWithAuthor = MicroBlog & {
    author: Profile | null;
    user_liked_micro_blog?: boolean;
    likes?: number | null;
  }
}
