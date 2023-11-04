import "@/styles/navbar.css";

import Link from "next/link";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LogOut from "../Auth/LogOutBtn";
import Search from "../SearchBar";

export default async function NavBar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = String(user?.id);

  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId);

  if (data) {
    const user = data[0];

    return (
      <div className="flex navbar justify-around w-auto items-center">
        <div className="logo-wrapper">
          <Link href="/">
            <img src="/logos/logo.svg" alt="lambda logo" width={50} />
          </Link>
        </div>
        <div className="my-auto w-1/2">
          <Search />
        </div>
        <div className="rounded-full dropdown">
          <img
            src="https://ezpie.vercel.app/favicon.svg"
            alt="user profile image"
            width={50}
            className="bg-white rounded-full"
          />
          <div className="dropdown-content">
            <ul>
              <li className="dropdown-option">
                <Link href={`/user/${user.username}`}>Profile</Link>
              </li>
              <li className="dropdown-option">
                <LogOut />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
