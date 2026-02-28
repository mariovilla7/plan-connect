import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useSupportChat } from "@/hooks/useSupportChat";
import { cn } from "@/lib/utils";

const WA_URL = "https://wa.me/359896676923";

const WELCOME_MESSAGE =
  "¡Hola! Soy el asistente de Kleia. ¿Te ayudo a recuperar tiempo para tus pacientes?";

export default function SupportBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage } = useSupportChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    sendMessage(trimmed);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
          aria-label="Abrir chat de soporte"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex w-[340px] sm:w-[380px] flex-col rounded-2xl border bg-card shadow-2xl overflow-hidden"
          style={{ height: "min(520px, calc(100dvh - 48px))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <span className="font-semibold text-sm">Asistente de Kleia</span>
            <button onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
            {/* Welcome */}
            <Bubble role="assistant" content={WELCOME_MESSAGE} />
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground pl-1">
                <span className="animate-pulse">Kleia está escribiendo</span>
                <span className="animate-bounce">...</span>
              </div>
            )}
          </div>

          {/* WhatsApp shortcut */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 mb-2 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-medium text-white hover:brightness-95 transition"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.857L0 24l6.335-1.652A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.875 0-3.63-.525-5.13-1.44l-.36-.216-3.765.99.99-3.63-.234-.375A9.7 9.7 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
            </svg>
            Escribirnos por WhatsApp
          </a>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 border-t px-3 py-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 transition"
              aria-label="Enviar mensaje"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-accent text-accent-foreground rounded-bl-md"
        )}
      >
        {content}
      </div>
    </div>
  );
}
