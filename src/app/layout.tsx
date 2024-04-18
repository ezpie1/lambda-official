import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import analytics by vercel for analysis
import { Analytics } from "@vercel/analytics/react";

import "@/styles/global.css";
import NavBar from "@/components/Banners/NavBar";

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

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/logo.svg" />
        <title>Lambda</title>
      </head>
      <body className="w-[100vw] overflow-x-hidden">
        {session && <NavBar />}
        <main className="mb-20">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
