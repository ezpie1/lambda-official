import Link from "next/link";

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
          <Link href={`/post/${post.id}`} test-data="posts">
            <div className="post-wrapper">
              <p className="post-author text-sm">
                {post.author?.username}
              </p>
              <p className="post-title" test-data="postTitle">
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
