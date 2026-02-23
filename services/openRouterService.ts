import { ChatMessage } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const MODEL = "arcee-ai/trinity-large-preview:free";

interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  reasoning_details?: any;
}

export const sendMessageToOpenRouter = async (
  message: string,
  history: ChatMessage[]
): Promise<{ text: string; reasoning_details?: any }> => {
  if (!API_KEY) {
    console.warn("OpenRouter API Key is missing.");
    return { text: "I'm sorry, my brain (OpenRouter API Key) is currently offline. Please check back later!" };
  }

  try {
    // Convert history to OpenRouter format
    const messages: OpenRouterMessage[] = history.map(msg => ({
      role: (msg.role === 'user' ? 'user' : 'assistant'),
      content: msg.text,
      reasoning_details: msg.reasoning_details // Pass back unmodified if present
    }));

    // Add system instruction at the beginning
    messages.unshift({
      role: 'system',
      content: SYSTEM_INSTRUCTION,
      reasoning_details: undefined
    });

    // Add the new user message
    messages.push({
      role: 'user',
      content: message,
      reasoning_details: undefined
    });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        // "HTTP-Referer": window.location.origin, // Optional, for including your app on openrouter.ai rankings.
        // "X-Title": "Md Umor Portfolio", // Optional. Shows in rankings on openrouter.ai.
      },
      body: JSON.stringify({
        "model": MODEL,
        "messages": messages,
        "reasoning": { "enabled": true }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(`OpenRouter API Error: ${response.statusText}`);
    }

    const result = await response.json();
    const choice = result.choices[0];
    
    return {
      text: choice.message.content,
      reasoning_details: choice.message.reasoning_details
    };

  } catch (error) {
    console.error("Error communicating with OpenRouter:", error);
    return { text: "I seem to be having trouble connecting to the server. Please try again." };
  }
};
