import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "@/styles/profilePage.css"; // stylesheet
import Link from "next/link";
import Image from "next/image";

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (user) {
    const { data: posts } = await supabase
      .from("Blogs")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    return (
      <div className="block md:flex h-max my-9">
        <div className="md:w-1/2 md:h-screen profile-info md:flex-col flex-row">
          <div className="md:mb-10 rounded-full user-avatar">
            <div className="avatar-preview">
              <Image
                src="https://ezpie.vercel.app/favicon.svg"
                alt="User avatar"
                className="avatar-wrapper"
                width={100}
                height={100}
              ></Image>
            </div>
          </div>
          <div className="md:px-5 ml-2">
            <p className="font-anonymous text-2xl mb-3">{user?.username}</p>
            <p className="font-inter">{user?.description}</p>
          </div>
        </div>
        <div className="mx-5 md:mt-0 mt-5 w-full">
          {posts?.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div className="user-post">
                <p className="font-anonymous text-3xl mb-5">{post.title}</p>
                <p className="font-inter">{post.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
