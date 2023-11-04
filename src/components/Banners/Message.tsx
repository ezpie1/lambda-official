import "@/styles/banners.css";
import { ReactNode } from "react";

// children: allows to add text, type: allows to define type of message
interface Props {
  children: ReactNode;
  type: string;
}

export default function Message({ children, type }: Props) {
  return (
    <div className={`${type}`}>
      <p>{children}</p>
    </div>
  );
}
