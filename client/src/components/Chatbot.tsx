import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, RotateCcw, AlertCircle, Sparkles } from "lucide-react";
import { sendChatMessage, ChatApiError, type ChatTurn } from "../lib/chatApi";
import "./Chatbot.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  isError?: boolean;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey! I'm Shruti's AI assistant. Ask me about her projects, technical skills, or experience.",
  timestamp: Date.now(),
};

const SUGGESTED_QUESTIONS = [
  "Tell me about Shruti's battery monitoring project.",
  "What technologies does she work with?",
  "What was her role in hackathons?",
  "Is she available for internships?",
  "How can I contact her?",
];

const MAX_LEN = 1000;

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const historyForApi = (): ChatTurn[] =>
    messages
      .filter((m) => m.id !== "welcome" && !m.isError)
      .map((m) => ({ role: m.role, content: m.content }));

  const submitMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: makeId(),
      role: "user",
      content: trimmed.slice(0, MAX_LEN),
      timestamp: Date.now(),
    };
    const history = historyForApi();
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChatMessage(userMsg.content, history);
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: res.reply,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      const msg =
        err instanceof ChatApiError ? err.message : "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: msg,
          timestamp: Date.now(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage(input);
    }
  };

  const resetConversation = () => {
    setMessages([{ ...WELCOME, id: "welcome", timestamp: Date.now() }]);
  };

  return (
    <>
      <button
        className={`chatbot__fab ${open ? "chatbot__fab--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <div
        ref={panelRef}
        className={`chatbot__panel ${open ? "chatbot__panel--open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label="Shruti's AI assistant chat"
      >
        <div className="chatbot__header">
          <div className="chatbot__header-title">
            <span className="chatbot__header-icon">
              <Sparkles size={16} />
            </span>
            <div>
              <div className="chatbot__header-name">Shruti's AI Assistant</div>
              <div className="chatbot__header-status">Ask me anything</div>
            </div>
          </div>
          <div className="chatbot__header-actions">
            <button
              onClick={resetConversation}
              aria-label="Reset conversation"
              className="chatbot__icon-btn"
              title="Reset conversation"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="chatbot__icon-btn"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="chatbot__messages">
          {messages.map((m) => (
            <div key={m.id} className={`chatbot__msg chatbot__msg--${m.role}`}>
              {m.isError && (
                <div className="chatbot__msg-error-icon">
                  <AlertCircle size={13} />
                </div>
              )}
              <div className={`chatbot__bubble ${m.isError ? "chatbot__bubble--error" : ""}`}>
                {m.content}
              </div>
              <span className="chatbot__timestamp">{formatTime(m.timestamp)}</span>
            </div>
          ))}

          {loading && (
            <div className="chatbot__msg chatbot__msg--assistant">
              <div className="chatbot__bubble chatbot__typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="chatbot__suggestions">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button key={q} className="chatbot__suggestion" onClick={() => submitMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="chatbot__input-row"
          onSubmit={(e) => {
            e.preventDefault();
            submitMessage(input);
          }}
        >
          <textarea
            ref={textareaRef}
            className="chatbot__textarea"
            value={input}
            maxLength={MAX_LEN}
            placeholder="Ask about projects, skills, experience..."
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Type your message"
          />
          <button
            type="submit"
            className="chatbot__send"
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <Send size={17} />
          </button>
        </form>
      </div>
    </>
  );
}
