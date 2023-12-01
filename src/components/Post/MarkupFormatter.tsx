import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Formatter(params: { postContent: string }) {
  const markdownContent = String(params.postContent);

  return (
    <>
      <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
    </>
  );
}
