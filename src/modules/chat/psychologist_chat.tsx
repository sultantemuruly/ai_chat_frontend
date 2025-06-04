import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";
import type { Message } from "../../shared/model/types";
import type { ChatProps } from "../../shared/model/types";

const PsychologistChat: React.FC<ChatProps> = ({
  name,
  description,
  imgSrc,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const systemMessage = {
    role: "system",
    content:
      "You are a compassionate and professional psychologist chatbot assistant. Your job is to listen, support, and provide helpful guidance while being respectful and non-judgmental.",
  };

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
          messages: [systemMessage, ...updatedMessages],
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
    <div className="flex flex-col h-screen w-full mx-auto p-8 md:p-20 bg-gray-50">
      {/* Chat Header */}
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
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
          <h1 className="text-xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-white shadow mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-3">
            <p
              className={`font-semibold ${
                msg.role === "user" ? "text-blue-600" : "text-green-600"
              }`}
            >
              {msg.role === "user" ? "You" : name}
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

export default PsychologistChat;
