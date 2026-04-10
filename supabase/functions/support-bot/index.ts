import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT =
  "Eres el asistente experto de Kleia. Ayuda a los nutricionistas a entender cómo el software les ahorra +6h semanales generando planes clínicos en minutos. Usa la información de esta web: envío de PDFs por WhatsApp, recálculo automático de macros y personalización profesional. Si preguntan por precios o demos, invítales a agendar una por WhatsApp al +359896676923. Responde siempre en español, de forma breve y profesional.";

const MAX_PROMPT_LENGTH = 2000;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Se requiere un campo 'prompt' de tipo texto." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Input length validation
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return new Response(
        JSON.stringify({ error: "El mensaje es demasiado largo. Máximo 2000 caracteres." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize suspicious prompt injection patterns
    const sanitizedPrompt = prompt
      .replace(/ignore\s*(all\s*)?(previous|above|prior|system)\s*(instructions?|prompts?|rules?)/gi, "")
      .replace(/\[SYSTEM\]|\[INST\]|<\/?system>|<\/?instructions?>/gi, "")
      .trim();

    if (!sanitizedPrompt) {
      return new Response(
        JSON.stringify({ error: "Mensaje no válido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Servicio temporalmente no disponible." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            { role: "user", parts: [{ text: sanitizedPrompt }] },
          ],
        }),
      }
    );

    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: "Demasiadas solicitudes. Intenta de nuevo en unos segundos." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!response.ok) {
      console.error("Gemini API error:", { status: response.status });
      return new Response(
        JSON.stringify({ error: "Lo sentimos, ocurrió un error. Intenta nuevamente o contáctanos por WhatsApp." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Lo siento, no pude generar una respuesta.";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("support-bot error:", {
      message: e instanceof Error ? e.message : "Unknown",
      timestamp: new Date().toISOString(),
    });
    return new Response(
      JSON.stringify({ error: "Lo sentimos, ocurrió un error. Intenta nuevamente o contáctanos por WhatsApp." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
