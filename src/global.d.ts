import { Database as DB } from "./lib/supabase.type";

type Post = DB["public"]["Tables"]["Blogs"]["Row"];
type Profile = DB["public"]["Tables"]["profiles"]["Row"];

declare global {
  type Database = DB;

  type post = Post & {
    author: Profile;
    user_liked_post: boolean;
    likes: number;
  };
}
