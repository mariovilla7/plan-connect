import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function useSupportChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userInput: string) => {
    const userMsg: ChatMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const history = [...messages, userMsg];

      const { data, error } = await supabase.functions.invoke("gemini-proxy", {
        body: {
          mode: "text",
          messages: [
            {
              role: "system",
              content:
                "Eres el asistente experto de Kleia. Ayuda a los nutricionistas a entender cómo el software les ahorra +6h semanales generando planes clínicos en minutos. Usa la información de esta web: envío de PDFs por WhatsApp, recálculo automático de macros y personalización profesional. Si preguntan por precios o demos, invítales a agendar una por WhatsApp.",
            },
            ...history,
          ],
        },
      });

      if (error) throw error;

      const assistantContent =
        typeof data === "string"
          ? data
          : data?.choices?.[0]?.message?.content ??
            data?.text ??
            data?.response ??
            "Lo siento, no pude generar una respuesta.";

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
