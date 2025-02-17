import Link from "next/link";
import Image from "next/image";

import Formatter from "../Post/MarkupFormatter";


interface Props {
  posts: postWithAuthor[]
}

/**
 * A rendering function to display posts with different arrays of data
 * 
 * @param { postWithAuthor[] } posts - The array of posts which is suppose to be rendered
 * @returns JSX.Elements
 */
export default function PostDisplayFunction({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <div className="post-container" key={post.id} >
          <Link href={`/post/${post.id}`}>
            <div className="post-wrapper">
              <p className="post-author">
                <Image
                  src="/icons/profile-icon.svg"
                  alt="user avatar"
                  width={50}
                  height={50}
                />
                <span>{post.author?.username}</span>
              </p>
              <p className="post-title">
                {post.title}
              </p>
              <p className="line-clamp-2 post-content">
                {post.content && <Formatter postContent={post.content} />}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
