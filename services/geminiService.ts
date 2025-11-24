import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTeacherMessage = async (): Promise<{ message: string; iconSvg: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Öğretmenler Günü için "Ruhun Mimarı" (Architect of the Soul) temalı, duygusal ve edebi bir kutlama mesajı oluştur.
      
      Görevin:
      1. Öğretmenin değerini anlatan, heykeltıraş ve mimar metaforlarını kullanan şiirsel bir düz yazı (mensur şiir) yaz.
      2. Bu temayı yansıtan basit, line-art stilinde bir SVG ikonu oluştur.

      Çıktı JSON formatında olmalıdır.`,
      config: {
        temperature: 1, 
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING },
            iconSvg: { type: Type.STRING },
          },
          required: ["message", "iconSvg"],
        },
      }
    });

    let rawText = response.text || "{}";
    
    // Clean up markdown code blocks (```json ... ```) which the model might include
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    let result;
    try {
      result = JSON.parse(rawText);
    } catch (e) {
      console.warn("Initial JSON parse failed, attempting substring extraction", e);
      // Fallback: Try to extract JSON object if there's extra text around it
      const firstBrace = rawText.indexOf('{');
      const lastBrace = rawText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        try {
           result = JSON.parse(rawText.substring(firstBrace, lastBrace + 1));
        } catch (e2) {
           throw new Error("Failed to parse JSON response");
        }
      } else {
        throw new Error("Invalid JSON structure");
      }
    }

    if (!result.message) {
      throw new Error("Invalid response format: 'message' property missing");
    }

    // Clean up SVG string if it contains markdown
    let finalSvg = result.iconSvg || "";
    finalSvg = finalSvg.replace(/```xml/g, "").replace(/```/g, "").trim();
    
    // Ensure we have a valid SVG string start
    const svgStart = finalSvg.indexOf("<svg");
    if (svgStart > -1) {
        finalSvg = finalSvg.substring(svgStart);
    }

    if (!finalSvg) {
        finalSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
    }

    return {
      message: result.message,
      iconSvg: finalSvg
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return fallback content so the app continues to work gracefully
    return {
      message: "Bir tohumdum toprağa düşen, sen yağmur oldun.\nKaranlıktım, sen şafak oldun.\nRuhumun mimarı, yolumun ışığı...\nSen her şeyinle öğretmensin.",
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
    };
  }
};