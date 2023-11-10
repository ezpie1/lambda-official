import "@/styles/navbar.css";

// Import necessary libraries
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

// Importing necessary components
import LogOut from "../Auth/LogOutBtn";
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
        <div className="logo-wrapper">
          <Link href="/">
            <Image
              src="/logos/logo.svg"
              alt="lambda logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="my-auto w-1/2">
          <Search />
        </div>
        <div className="rounded-full dropdown">
          <Image
            src="https://ezpie.vercel.app/favicon.svg"
            alt="user profile image"
            width={50}
            height={50}
            className="bg-white rounded-full"
          />
          <div className="dropdown-content">
            <ul>
              <li className="dropdown-option">
                <Link href={`/user/${userInfo.username}`}>Profile</Link>
              </li>
              <li className="dropdown-option">
                <LogOut />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
