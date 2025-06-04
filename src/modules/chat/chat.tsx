import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";
import type { Message, ChatProps } from "../../shared/model/types";
import { useTheme } from "../theme/theme-context";
import { useMutation } from "@tanstack/react-query";

const Chat: React.FC<ChatProps> = ({
  name,
  description,
  imgSrc,
  systemPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const systemMessage = {
    role: "system",
    content: systemPrompt,
  };

  const chatMutation = useMutation({
    mutationFn: async (newMessages: Message[]) => {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [systemMessage, ...newMessages],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.choices[0].message;
    },
    onSuccess: (assistantReply) => {
      setMessages((prev) => [...prev, assistantReply]);
    },
    onError: (error) => {
      console.error("OpenAI API error:", error);
    },
  });

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    chatMutation.mutate(updatedMessages);
  };

  // Utility classes
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-black" : "bg-gray-50";
  const textMain = isDark ? "text-white" : "text-gray-900";
  const borderColor = isDark ? "border-gray-700" : "border-gray-300";
  const inputBg = isDark ? "bg-zinc-900" : "bg-white";

  return (
    <div
      className={`flex flex-col h-screen w-full mx-auto p-8 md:p-20 transition-colors duration-300 ${bgMain} ${textMain}`}
    >
      {/* Chat Header */}
      <div
        className={`flex items-center gap-4 mb-6 border-b pb-4 ${borderColor}`}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={name}
            className="w-14 h-14 rounded-full object-cover border"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
          <p
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Chat history */}
      <div
        className={`flex-1 overflow-y-auto border rounded-lg p-4 shadow mb-4 ${inputBg} ${borderColor}`}
      >
        {messages.map((msg, index) => (
          <div key={index} className="mb-3">
            <p
              className={`font-semibold ${
                msg.role === "user"
                  ? isDark
                    ? "text-blue-400"
                    : "text-blue-600"
                  : isDark
                  ? "text-green-400"
                  : "text-green-600"
              }`}
            >
              {msg.role === "user" ? "You" : name}
            </p>
            <p className={isDark ? "text-white" : "text-gray-800"}>
              {msg.content}
            </p>
          </div>
        ))}
        {chatMutation.isPending && (
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            AI is typing...
          </p>
        )}
      </div>

      {/* Input bar */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={chatMutation.isPending}>
          {chatMutation.isPending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default Chat;
