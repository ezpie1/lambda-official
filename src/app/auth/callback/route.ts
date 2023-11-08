// import necessary libraries
import { NextResponse, type NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * HTTP GET method to create a cookie for the user
 *
 * @param {NextRequest} req - the request done by the user once they click the link in the email
 *
 * @returns NextResponse
 */
export async function GET(req: NextRequest) {
  // using the url and get the code param from it
  const reqURL = new URL(req.url);
  const code = reqURL.searchParams.get("code");

  // If we have the code...
  if (code) {
    // ... create supabase connection and exchange the code for a session
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect the user to the homepage
  return NextResponse.redirect(reqURL.origin);
}
