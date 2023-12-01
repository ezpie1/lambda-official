// import necessary libraries
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Formatter function for formatting markdown content
 * @param {string} params.postContent - the content of the post in markdown format
 *
 * @returns JSX.Element
 */
export default function Formatter(params: { postContent: string }) {
  // stringify the markdown content
  const markdownContent = String(params.postContent);

  return (
    <>
      <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
    </>
  );
}
