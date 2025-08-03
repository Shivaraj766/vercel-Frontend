import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Minimize2, Maximize2, MessageCircle } from 'lucide-react';
import './chatbot.css';

const ChatBot = ({ isOpen, onClose, onToggle, showFloatingButton = true }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Chitti, your AI study assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const generateBotResponse = (userMessage) => {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand what you're looking for. Here's what I can tell you:",
      "Based on your query, I'd recommend checking the study materials in your subject folder.",
      "That's an interesting topic! Would you like me to find relevant resources for you?",
      "I can help you with that. Let me provide some guidance:",
      "Great question! This is commonly asked by students. Here's my advice:",
      "I'm here to help with your studies. Let me break this down for you:",
      "That's a smart question to ask. Here's what you should know:"
    ];

    // Simple keyword-based responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello there! I'm excited to help you with your studies today. What subject are you working on?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
      return "I'm here to assist you! I can help with study materials, subject explanations, exam preparation, and finding resources. What do you need help with?";
    }
    
    if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      return "Great! I love helping students learn. Are you looking for study materials for a specific subject or topic? I can guide you to the right resources.";
    }
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return "Exam preparation is crucial! I can help you find study materials, practice questions, and create a study plan. Which subject's exam are you preparing for?";
    }
    
    if (lowerMessage.includes('pdf') || lowerMessage.includes('material')) {
      return "I can help you find PDF materials and study resources! Check the 'View All Subjects' section to access Google Drive folders with all the materials you need.";
    }

    // Random response for other messages
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleFloatingButtonClick = () => {
    if (onToggle) {
      onToggle();
    }
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Button - ALWAYS render, just hide when chatbot is open OR when showFloatingButton is false */}
      {showFloatingButton && (
        <button 
          className="chatbot-floating-btn" 
          onClick={handleFloatingButtonClick}
          title="Open Chitti AI Assistant"
          style={{
            display: isOpen ? 'none' : 'flex',
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 2147483647,
            visibility: 'visible',
            opacity: 1
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chatbot Overlay */}
      {isOpen && (
        <div className={`chatbot-overlay ${isMinimized ? 'minimized' : ''}`}>
          <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="bot-avatar">
              <Bot className="w-6 h-6" />
            </div>
            <div className="bot-info">
              <h3>Chitti AI Assistant</h3>
              <span className="bot-status">Online</span>
            </div>
          </div>
          <div className="chatbot-controls">
            <button 
              className="control-btn minimize-btn" 
              onClick={handleMinimize}
              title="Minimize to floating button"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button className="control-btn close-btn" onClick={onClose} title="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-avatar">
                    {message.sender === 'bot' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="message-avatar">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input">
              <div className="input-container">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="message-input"
                  rows="1"
                />
                <button 
                  onClick={handleSendMessage} 
                  className="send-btn"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
      )}
    </>
  );
};

export default ChatBot;
