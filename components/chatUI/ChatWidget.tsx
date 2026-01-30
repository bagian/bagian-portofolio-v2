"use client";

import ReactMarkdown from "react-markdown";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setError(false);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Gagal mengambil respon");
      if (!response.body) throw new Error("No body");

      const botMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: botMsgId, role: "assistant", content: "" },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let botText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        botText += chunkValue;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, content: botText } : msg
          )
        );
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const windowEl = chatWindowRef.current;

    if (isOpen) {
      if (windowEl) {
        gsap.set(windowEl, { display: "flex" });
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          gsap.fromTo(
            windowEl,
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.4, ease: "power3.out" }
          );
        } else {
          gsap.fromTo(
            windowEl,
            { y: 20, opacity: 0, scale: 0.9, transformOrigin: "bottom right" },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
          );
        }
      }
    } else {
      if (windowEl) {
        gsap.to(windowEl, {
          y: 20,
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            windowEl.style.display = "none";
          },
        });
      }
    }
  }, [isOpen]);

  return (
    <div className="fixed z-[99] font-sans text-black">
      <div
        ref={chatWindowRef}
        className={`
            hidden flex-col bg-white overflow-hidden shadow-2xl
            fixed
            inset-0 w-full h-full rounded-none
            md:inset-auto md:bottom-6 md:right-6 
            md:w-[380px] md:h-[600px] md:max-h-[85vh] 
            md:rounded-2xl md:border md:border-gray-200
        `}
      >
        {/* HEADER */}
        <div className="bg-[#1A1A1A] p-4 text-white flex justify-between items-center shrink-0 shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-inner">
              <Bot size={20} />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 leading-none mb-1 uppercase tracking-wider">
                Support Agent
              </p>
              <p className="text-sm font-bold tracking-wide">Bagian AI</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* MESSAGES BODY (FIX SCROLL) */}
        <div
          ref={scrollRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F9FA] min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent overscroll-contain"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-40 space-y-3 px-10 text-center">
              <Bot size={56} className="text-gray-400" />
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Halo! Saya asisten virtual Bagian Corps. Ada yang bisa saya
                bantu jelaskan?
              </p>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-black text-white rounded-tr-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                {m.role === "user" ? (
                  m.content
                ) : (
                  <div
                    className="prose prose-sm max-w-none 
                        prose-p:m-0 prose-p:leading-relaxed 
                        prose-ul:my-0 prose-li:my-0
                        prose-headings:m-0
                        whitespace-pre-wrap text-gray-800"
                  >
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-indigo-600" />
                <span className="text-xs text-gray-400 font-mono">
                  Thinking...
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center py-2">
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-lg text-xs">
                <AlertCircle size={14} />
                <span>Gagal terhubung.</span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <form
          onSubmit={handleManualSubmit}
          className="p-3 bg-white border-t border-gray-100 flex gap-2 shrink-0 z-10 pb-6 md:pb-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 bg-gray-100 border-transparent focus:bg-white border focus:border-indigo-200 rounded-xl px-4 py-3 text-base md:text-sm focus:ring-2 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-black text-white w-12 h-12 md:w-10 md:h-10 rounded-xl hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-300 transition-all flex items-center justify-center shadow-md active:scale-95"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className={`
            fixed bottom-6 right-6 z-50
            w-14 h-14 bg-black text-white rounded-full 
            shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] 
            flex items-center justify-center 
            hover:scale-105 active:scale-95 
            transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "scale-0 opacity-0 pointer-events-none"
                : "scale-100 opacity-100"
            }
        `}
      >
        <MessageCircle size={26} />
      </button>
    </div>
  );
}
