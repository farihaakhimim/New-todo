
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Todo } from '../types';

export const suggestTask = async (): Promise<string | null> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Suggest a short, simple, productive to-do list item that can be completed in less than 15 minutes. Provide only the task text, without any preamble or quotes.",
      config: {
        temperature: 0.9,
        maxOutputTokens: 20,
      }
    });

    const text = response.text?.trim();

    // Clean up potential markdown or quotes
    if (text) {
        return text.replace(/['"*`]/g, '');
    }
    
    return null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

export const getChatResponse = async (
    history: ChatMessage[],
    todos: Todo[]
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const todoListString = todos.length > 0
        ? todos.map(t => `- ${t.text} (${t.completed ? 'completed' : 'pending'})`).join('\n')
        : "The user's to-do list is currently empty.";

    const systemInstruction = `You are a helpful to-do list assistant integrated into a to-do app. Your goal is to help the user manage their tasks and be more productive. Here is the user's current to-do list:\n${todoListString}\n\nKeep your responses concise and helpful. You can offer advice, break down tasks, or answer questions related to their to-do list.`;

    const contents = history.map(msg => ({
        role: msg.role as 'user' | 'model',
        parts: [{ text: msg.content }]
    }));

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        const text = response.text?.trim();
        return text || "Sorry, I couldn't come up with a response.";

    } catch (error) {
        console.error("Error calling Gemini API for chat:", error);
        throw error;
    }
};
