import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import analytics by vercel for analysis
import { Analytics } from "@vercel/analytics/react";

import NavBar from "@/components/Banners/NavBar";

import "@/styles/global.css";
import BottomNav from "@/components/Banners/BottomNav";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Used for checking if the user is authenticated or not. If yes then display the navbars
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // used by the bottomNav component for redirecting purpose
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/logo.svg" />
        <title>Lambda</title>
      </head>
      <body className="w-[100vw] overflow-x-hidden">
        {session && <NavBar />}
        {children}
        {session && <BottomNav userId={userId} />}
        <Analytics />
      </body>
    </html>
  );
}
