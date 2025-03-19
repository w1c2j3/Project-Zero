import { proxy } from 'valtio';
import { ChatMessage } from '../api/interfaces/chat.interface';
import { chatService } from '../api/services/chat.service';
import { authState } from './auth';

interface ChatState {
  messages: ChatMessage[];
  conversationId: string | null;
  isTyping: boolean;
  isLoading: boolean;
  error: string | null;
}

export const chatState = proxy<ChatState>({
  messages: [],
  conversationId: null,
  isTyping: false,
  isLoading: false,
  error: null,
});

export const chatActions = {
  // Send message
  sendMessage: async (message: string): Promise<boolean> => {
    if (!authState.token) {
      chatState.error = 'Authentication required';
      return false;
    }

    chatState.isLoading = true;
    chatState.error = null;

    try {
      // Add user message immediately to the UI
      const tempUserMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        content: message,
        sender: 'user',
        timestamp: Date.now(),
      };

      chatState.messages = [...chatState.messages, tempUserMessage];
      chatState.isTyping = true;

      // Send to API
      const response = await chatService.sendMessage(
        {
          message,
          conversationId: chatState.conversationId
        },
        authState.token
      );

      // Update conversation ID if needed
      if (!chatState.conversationId) {
        chatState.conversationId = response.conversationId;
      }

      // Add AI response
      chatState.messages = [...chatState.messages, response.message];
      chatState.isTyping = false;

      return true;
    } catch (error) {
      chatState.error = error instanceof Error ? error.message : 'Failed to send message';
      chatState.isTyping = false;
      return false;
    } finally {
      chatState.isLoading = false;
    }
  },

  // Load conversation
  loadConversation: async (conversationId: string): Promise<boolean> => {
    if (!authState.token) {
      chatState.error = 'Authentication required';
      return false;
    }

    chatState.isLoading = true;
    chatState.error = null;

    try {
      const response = await chatService.getConversation(conversationId, authState.token);
      chatState.messages = response.messages;
      chatState.conversationId = response.conversationId;
      return true;
    } catch (error) {
      chatState.error = error instanceof Error ? error.message : 'Failed to load conversation';
      return false;
    } finally {
      chatState.isLoading = false;
    }
  },

  // Clear chat
  clearChat: (): void => {
    chatState.messages = [];
    chatState.conversationId = null;
    chatState.error = null;
  },
};