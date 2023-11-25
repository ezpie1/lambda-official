// Import necessary libraries
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// importing stylesheet
import "@/styles/settings.css";

// importing ProfileSettings component
import ProfileSettings from "@/components/Settings/ProfileSettings";

// Tell's vercel that this is a dynamic function
export const dynamic = "force-dynamic";

/**
 * This is the `/settings/profile` route that is used to update the information of the user using UI
 *
 * @returns JSX.Element
 */
export default async function Page() {
  // Connect supabase
  const supabase = createServerComponentClient<Database>({ cookies });

  // This is used by the ProfileSettings component to make changes with checks
  const currentUser = await supabase.auth.getUser();
  const currentUserId = String(currentUser.data.user?.id);

  // Get all the information about the current user
  const { data: userInfo } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", currentUserId)
    .single();

  return (
    <div className="md:mx-10 mx-5 mt-5">
      <section className="w-full profile-setting">
        {userInfo != null && <ProfileSettings userInfo={userInfo} />}
      </section>
    </div>
  );
}
