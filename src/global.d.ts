import { Database as DB } from "./lib/supabase.type";

type Post = DB["public"]["Tables"]["Blogs"]["Row"];

declare global {
  type Database = DB;

  type Profile = DB["public"]["Tables"]["profiles"]["Row"];

  type postWithAuthor = Post & {
    author: Profile | null;
    user_liked_post?: boolean;
    likes?: number;
  };
}
