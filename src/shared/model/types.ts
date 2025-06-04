export interface ChatProps {
  name: string;
  description: string;
  imgSrc?: string;
}

export type Message = {
  role: "user" | "assistant";
  content: string;
};
