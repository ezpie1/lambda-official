"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogOut = async () => {
    await supabase.auth.signOut();

    router.refresh();
  };

  return <button onClick={handleLogOut}>Log Out</button>;
}
