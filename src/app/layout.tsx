import NavBar from "@/components/Banners/NavBar";
import "@/styles/global.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Used for checking if the user is authenticated or not. If yes then display the navbar
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
      <body>
        {session && <NavBar />}
        {children}
      </body>
    </html>
  );
}
