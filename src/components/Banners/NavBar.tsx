import "@/styles/navbar.css";

// Import necessary libraries
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

// Importing necessary components
import Search from "../SearchBar";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

export default async function NavBar() {
  // connect to supabase
  const supabase = createServerComponentClient<Database>({ cookies });

  // get the user's id for getting information about the user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = String(user?.id);

  // get the username of the current user.
  const { data: userInfo } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  // * If their is a user, then continue
  if (userInfo) {
    return (
      <nav className="flex navbar justify-around w-auto items-center">
        <div className="logo-wrapper sm:scale-100 scale-90">
          <Link href="/">
            <Image
              src="/logos/logo.svg"
              alt="lambda logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="my-auto w-1/2 sm:scale-100 scale-90">
          <Search />
        </div>
        <div className="sm:scale-100 scale-90">
          <Link href="/new-post" className="new-post-btn" test-data="newPost">
            <span>New Post</span>
          </Link>
        </div>
      </nav>
    );
  }
}
