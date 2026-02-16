import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hi 👋 I’m your LIC AI assistant. I can help you with term plans, savings plans, premiums, or eligibility. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg.text }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "AI failed");

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Sorry 😔 I’m having trouble right now. Please try again or contact our advisor.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      {!open && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            onClick={() => setOpen(true)}
            className="
              flex items-center gap-2
              bg-[#B11226] hover:bg-[#8f0e1d]
              text-white px-4 py-3
              rounded-full shadow-lg
              transition active:scale-95 sm:hover:scale-105
            "
          >
            <MessageCircle size={20} />
            <span className="font-semibold text-sm hidden sm:block">
              Chat
            </span>
          </button>
        </div>
      )}

      {/* CHAT BOX */}
      {open && (
        <div className="fixed inset-0 z-50 flex sm:items-end sm:justify-end sm:p-12">
          {/* Overlay (mobile tap to close) */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 sm:hidden"
          />

          <div
            className="
              relative bg-white
              w-full h-full
              sm:w-[380px] sm:h-[520px]
              sm:rounded-2xl
              shadow-2xl
              flex flex-col
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div>
                <p className="font-semibold">LIC AI Assistant</p>
                <p className="text-xs text-green-600">
                  {loading ? "Typing..." : "Online"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-4 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t px-3 py-2 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="
                  flex-1 border rounded-lg px-3 py-2
                  text-base sm:text-sm
                  focus:outline-none
                "
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="
                  bg-[#B11226] text-white
                  px-4 sm:px-3
                  rounded-lg
                  disabled:opacity-50
                "
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
