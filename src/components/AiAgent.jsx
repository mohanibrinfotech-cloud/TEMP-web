import { useEffect, useState } from "react";
import axios from "axios";

export default function AIAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-chat");

    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initial = [
        {
          role: "assistant",
          content:
            "Hi! I'm Mohan's AI assistant. Ask me about projects, skills, services or experience."
        }
      ];

      setMessages(initial);

      localStorage.setItem(
        "portfolio-chat",
        JSON.stringify(initial)
      );
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input
    };

    const updatedMessages = [
      ...messages,
      userMessage
    ];

    setMessages(updatedMessages);

    localStorage.setItem(
      "portfolio-chat",
      JSON.stringify(updatedMessages)
    );

    setInput("");

    try {
      const { data } = await axios.post(
        "/api/chat",
        {
          messages: updatedMessages
        }
      );

      const finalMessages = [
        ...updatedMessages,
        {
          role: "assistant",
          content: data.answer
        }
      ];

      setMessages(finalMessages);

      localStorage.setItem(
        "portfolio-chat",
        JSON.stringify(finalMessages)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("portfolio-chat");

    const initial = [
      {
        role: "assistant",
        content:
          "Hi! I'm Mohan's AI assistant. Ask me anything."
      }
    ];

    setMessages(initial);

    localStorage.setItem(
      "portfolio-chat",
      JSON.stringify(initial)
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg"
      >
        🤖
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 flex h-[550px] w-[380px] flex-col rounded-lg border bg-white shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-bold">
              Mohan AI Assistant
            </h2>

            <button
              onClick={clearChat}
              className="text-sm text-red-500"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  msg.role === "user"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {[
                "Tell me about projects",
                "What skills does Mohan have?",
                "How can I contact Mohan?"
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="rounded-full border px-3 py-1 text-xs"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  sendMessage()
                }
                className="flex-1 rounded border p-2"
                placeholder="Ask anything..."
              />

              <button
                onClick={sendMessage}
                className="rounded bg-blue-600 px-4 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}