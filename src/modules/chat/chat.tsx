import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: updatedMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const assistantReply = response.data.choices[0].message;
      setMessages([...updatedMessages, assistantReply]);
    } catch (error) {
      console.error("OpenAI API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full mx-auto p-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat with AI</h1>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-white shadow mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-3">
            <p
              className={`font-semibold ${
                msg.role === "user" ? "text-blue-600" : "text-green-600"
              }`}
            >
              {msg.role === "user" ? "You" : "ChatGPT"}
            </p>
            <p className="text-gray-800 whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">AI is typing...</p>}
      </div>

      {/* Input bar */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default Chat;
