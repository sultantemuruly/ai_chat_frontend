export interface ChatProps {
  name: string;
  description: string;
  imgSrc?: string;
  systemPrompt: string;
}

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type Theme = "light" | "dark";

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}
