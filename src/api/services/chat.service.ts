import { ChatMessage, SendMessageRequest, SendMessageResponse, GetConversationResponse } from '../interfaces/chat.interface';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const chatService = {
  sendMessage: async (request: SendMessageRequest, token: string): Promise<SendMessageResponse> => {
    try {
      const response = await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      return await response.json();
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  getConversation: async (conversationId: string, token: string): Promise<GetConversationResponse> => {
    try {
      const response = await fetch(`${API_URL}/chat/conversation/${conversationId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get conversation');
      }

      return await response.json();
    } catch (error) {
      console.error('Get conversation error:', error);
      throw error;
    }
  }
};