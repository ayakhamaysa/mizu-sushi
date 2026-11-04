import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// All the chat texts in both languages
const texts = {
  ar: {
    welcome: "أهلاً فيك بـ MIZU 🍣 أنا الشيف. احكيلي شو بتحب، أو إذا أول مرة، وأنا بساعدك تختار.",
    suggestions: ["أول مرة باكل سوشي", "بدي إشي مش نيء", "شو الفرق بين النيغيري والساشيمي؟", "عشا لشخصين بـ 200 درهم"],
    button: "اسأل الشيف",
    title: "الشيف",
    subtitle: "بيساعدك تختار من منيو MIZU",
    thinking: "الشيف عم بفكّر…",
    placeholder: "اسأل الشيف…",
    send: "إرسال",
    close: "إغلاق",
    error: "صار في مشكلة صغيرة 😅 جرّب كمان مرة بعد شوي.",
  },
  en: {
    welcome: "Welcome to MIZU 🍣 I'm the chef. Tell me what you like, or if it's your first time, and I'll help you choose.",
    suggestions: ["First time eating sushi", "Nothing raw, please", "Nigiri vs sashimi?", "Dinner for two under AED 200"],
    button: "Ask the Chef",
    title: "The Chef",
    subtitle: "Helps you choose from the MIZU menu",
    thinking: "The chef is thinking…",
    placeholder: "Ask the chef…",
    send: "Send",
    close: "Close",
    error: "Something went wrong 😅 Please try again in a moment.",
  },
};

export default function Assistant({ lang }) {
  const t = texts[lang];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: t.welcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // Scroll to the newest message
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text) {
    const question = text.trim();
    if (!question || loading) return;

    const next = [...messages, { role: "user", text: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Our own serverless function (api/assistant.js), not Gemini directly
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1), lang }), // without the welcome message
      });
      // 404 means the api folder is not running (use "npx vercel dev", not "npm run dev")
      if (res.status === 404) throw new Error("API not found: run the site with npx vercel dev");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages([...next, { role: "assistant", text: data.answer }]);
    } catch (error) {
      console.error("Assistant:", error.message);
      // While building on your computer, show the real problem under the message
      const details = import.meta.env.DEV ? `\n(${error.message})` : "";
      setMessages([...next, { role: "assistant", text: t.error + details }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 end-5 z-30 flex items-center gap-2 bg-shu text-white font-semibold rounded-full ps-4 pe-5 py-3 shadow-xl shadow-shu/30 hover:bg-shu/85 transition-colors"
        >
          <span className="text-xl">🍣</span>
          {t.button}
        </button>
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:end-5 sm:bottom-5 sm:w-96 z-40 bg-coal rounded-3xl shadow-2xl border border-paper/10 flex flex-col max-h-[78vh]"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-paper/10">
              <img src="/koi.png" alt="" className="w-10 h-10 rounded-full bg-black/40 p-1" />
              <div className="flex-1">
                <p className="font-semibold">{t.title}</p>
                <p className="text-xs text-stone">{t.subtitle}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t.close} className="text-2xl leading-none text-stone hover:text-paper">
                ×
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <p
                  key={i}
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-paper text-ink ms-auto rounded-bl-sm" : "bg-black/40 rounded-br-sm"
                  }`}
                >
                  {m.text}
                </p>
              ))}
              {loading && <p className="bg-black/40 rounded-2xl px-4 py-2.5 text-sm w-fit animate-pulse">{t.thinking}</p>}
            </div>

            {/* Ready questions, only before the first question */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {t.suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-xs border border-paper/15 rounded-full px-3 py-1.5 hover:border-gold hover:text-gold">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 p-3 border-t border-paper/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                maxLength={300}
                className="flex-1 bg-black/40 rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-stone focus:ring-2 focus:ring-shu/50"
              />
              <button disabled={loading} className="bg-shu text-white rounded-full px-5 text-sm font-semibold disabled:opacity-50">
                {t.send}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
