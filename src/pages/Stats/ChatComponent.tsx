// src/app/chat/ChatComponent.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { chatState, chatActions, authState } from '../../states/auth';
import './chat.module.sass';

const ChatComponent: React.FC = () => {
  const chat = useSnapshot(chatState);
  const auth = useSnapshot(authState);

  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || chat.isLoading) {
      return;
    }

    if (!auth.isAuthenticated) {
      alert('请先登录');
      return;
    }

    const trimmedMessage = message.trim();
    setMessage('');

    await chatActions.sendMessage(trimmedMessage);
  };

  const handleClearChat = () => {
    chatActions.clearChat();
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h2 className="chat__title">AI 助手</h2>
        <button
          className="chat__clear-button"
          onClick={handleClearChat}
          disabled={chat.messages.length === 0}
        >
          清空对话
        </button>
      </div>

      <div className="chat__messages">
        {chat.messages.length === 0 ? (
          <div className="chat__empty">
            <p>开始新的对话吧！</p>
          </div>
        ) : (
          <>
            {chat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat__message ${msg.sender === 'user' ? 'chat__message--user' : 'chat__message--ai'}`}
              >
                <div className="chat__message-content">
                  {msg.content}
                </div>
                <div className="chat__message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}

            {chat.isTyping && (
              <div className="chat__message chat__message--ai chat__message--typing">
                <div className="chat__typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form className="chat__input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入消息..."
          className="chat__input"
          disabled={!auth.isAuthenticated || chat.isLoading}
        />
        <button
          type="submit"
          className="chat__send-button"
          disabled={!message.trim() || !auth.isAuthenticated || chat.isLoading}
        >
          发送
        </button>
      </form>

      {chat.error && (
        <div className="chat__error">
          {chat.error}
        </div>
      )}
    </div>
  );
};

export default ChatComponent;

