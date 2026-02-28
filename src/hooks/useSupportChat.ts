import { useState, useCallback } from "react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SUPPORT_BOT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/support-bot`;

export function useSupportChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userInput: string) => {
    const userMsg: ChatMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build context from conversation history
      const history = [...messages, userMsg];
      const fullPrompt = history
        .map((m) => `${m.role === "user" ? "Usuario" : "Asistente"}: ${m.content}`)
        .join("\n");

      const res = await fetch(SUPPORT_BOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Error del servidor");
      }

      const data = await res.json();
      const assistantContent =
        data?.text ?? "Lo siento, no pude generar una respuesta.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantContent },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hubo un error al conectar con el asistente. Intenta de nuevo o escríbenos por WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, isLoading, sendMessage };
}
