
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string, category: string, keywords: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a compelling, high-end luxury fashion product description for a ${productName} in the ${category} category. Include these keywords: ${keywords.join(', ')}. Keep it under 100 words.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content.";
  }
};

export const getStylingAdvice = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a celebrity fashion stylist. Provide 3 quick, elegant styling tips for a customer who just bought a "${productName}". Focus on accessories, shoes, and occasion.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text || "Pair it with your favorite confidence!";
  } catch (error) {
    return "Our stylists are currently busy, but this piece looks great with everything!";
  }
};

export const getBusinessInsights = async (salesData: any): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this weekly sales data for a luxury clothing brand: ${JSON.stringify(salesData)}. Provide 3 brief, actionable strategic insights for the manager.`,
      config: {
        temperature: 0.4,
      }
    });
    return response.text || "No insights available.";
  } catch (error) {
    return "Could not fetch insights.";
  }
};
