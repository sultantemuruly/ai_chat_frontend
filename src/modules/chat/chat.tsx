import React, { useState } from "react";
import axios from "axios";

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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat with AI</h1>

      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-white shadow">
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

      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
