import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Chatbot() {
  const [open, setOpen] = useState(true); // 👈 control open/close
  const [messages, setMessages] = useState([
    { from: "bot", text: "नमस्ते 👋 I am PMIR Assistant. Ask about eligibility, internships, or roadmap!" }
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("auto"); 
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    recognitionRef.current = rec;
    rec.interimResults = false;
    rec.continuous = false;

    rec.onresult = (ev) => {
      const text = ev.results[0][0].transcript;
      handleUserMessage(text);
      setListening(false);
    };

    rec.onend = () => setListening(false);
    rec.onerror = (e) => {
      console.error("Speech recognition error:", e);
      setListening(false);
    };
  }, []);

  const detectLang = (text) => (/[\u0900-\u097F]/.test(text) ? "hi-IN" : "en-US");

  const startListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.lang = lang === "auto" ? "hi-IN" : lang;
    recognitionRef.current.start();
    setListening(true);
  };

  const speak = (text, outLang = "en-US") => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = outLang;
    window.speechSynthesis.speak(utter);
  };

  const botBrain = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("eligible") || text.includes("eligibility")) {
      return "Eligibility: Age 21–24, not full-time employed or studying, family income ≤ ₹8L, no govt. job in family.";
    } else if (text.includes("roadmap") && text.includes("ai")) {
      return "AI Roadmap: Learn Python → Data Science → Machine Learning → Deep Learning → Projects & Internship.";
    } else if (text.includes("roadmap") && text.includes("web")) {
      return "Web Dev Roadmap: HTML → CSS → JavaScript → React → Backend → Projects.";
    }
    return "I didn’t fully understand 🤔 Ask about eligibility, AI roadmap, or Web roadmap!";
  };

  const handleUserMessage = (text) => {
    const userLang = lang === "auto" ? detectLang(text) : lang;
    setMessages((m) => [...m, { from: "user", text }]);
    const reply = botBrain(text);
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: reply }]);
    speak(reply, userLang);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleUserMessage(input);
    setInput("");
  };

  if (!open) {
    // 👇 Floating reopen button
    return (
      <button className="chatbot-toggle" onClick={() => setOpen(true)}>
        💬 Chat
      </button>
    );
  }

  return (
    <div className="chatbot-container">
      {/* Header with close button */}
      <div className="chatbot-header">
        <span>PMIR Assistant</span>
        <button className="close-btn" onClick={() => setOpen(false)}>❌</button>
      </div>

      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>{m.text}</div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or use mic..."
        />
        <button type="submit">Send</button>
        <button
          type="button"
          onClick={startListening}
          className={listening ? "listening" : ""}
        >
          🎤
        </button>
      </form>

      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="auto">Auto</option>
        <option value="hi-IN">Hindi</option>
        <option value="en-US">English</option>
      </select>
    </div>
  );
}
