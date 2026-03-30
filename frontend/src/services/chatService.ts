interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8000/chat';

export async function sendChatMessage(
  message: string,
  conversationHistory: Message[]
): Promise<string> {
  try {
    // Format conversation history for API
    const formattedHistory = conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory: formattedHistory,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data.response || 'No response from AI';
  } catch (error) {
    console.error('Chat service error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to communicate with chat service');
  }
}