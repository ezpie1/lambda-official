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
      <nav className="navbar">
        <div className="logo-wrapper xl:m-auto">
          <Link href="/">
            <Image
              src="/logos/logo.svg"
              alt="lambda logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="my-auto w-1/2 xl:w-full">
          <Search />
        </div>
        <div className="md:visible invisible"></div>
        <div className="ml-2 justify-self-end xl:m-auto">
          <div className="dropdown">
            <span>
              <Image 
                src="/icons/profile-icon.svg"
                alt="User Avatar"
                width={50}
                height={50}
              />
            </span>
            <ul className="dropdown-menu">
              
              <Link href={`/user/${userInfo.username}`}>
              <div className="user-detail-navbar">
                  <Image 
                    src="/icons/profile-icon.svg"
                    alt="User Avatar"
                    width={50}
                    height={50}
                  />
                  <span>{userInfo.username}</span>
                </div>
              </Link>
              <Link href={`/user/${userInfo.username}`}>
                <li>
                  Profile
                </li>
              </Link>
              <Link href='/settings/profile'>
                <li>
                  Settings
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

/**
 * Helper funtion to get username from database
 *
 * @returns {string | null} currentUser
 *
 */
async function GetUserName() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (userId) {
    const {data: currentUser} = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();
    return currentUser;
  }
    
    return null;
}
