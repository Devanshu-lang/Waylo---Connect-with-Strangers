import React, { useState } from 'react';
import { ChatThread, ChatMessage } from '../../data/mockData';

interface MessagesScreenProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onSendMessage: (threadId: string, text: string) => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');

  const currentThread = threads.find((t) => t.id === activeThreadId) || null;

  const handleSend = () => {
    if (!inputText.trim() || !currentThread) return;
    onSendMessage(currentThread.id, inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickPrompts = [
    'Have you tried Araku in Indiranagar yet?',
    'Down for a quick filter coffee walk this weekend?',
    'What neighborhood do you usually work from?'
  ];

  return (
    <div className="flex flex-col w-full pb-24 px-4 sm:px-6 pt-4 max-w-4xl mx-auto h-[calc(100vh-6rem)]">
      {/* If no thread selected or mobile view switcher */}
      {!currentThread ? (
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#070235] tracking-tight">
                Messages
              </h1>
              <p className="text-xs text-[#47464f] mt-0.5">
                Low-pressure chats with fresh arrivals & small-group organizers
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad2] text-[#3d0600] text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span>Encrypted & Safe</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {threads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => onSelectThread(thread.id)}
                className="p-4 rounded-3xl bg-white hover:bg-[#faf9f6] border border-[#1e1b4b]/5 flex items-center gap-3.5 cursor-pointer shadow-sm hover:shadow transition-all"
              >
                <div className="relative">
                  <img
                    src={thread.avatar}
                    alt={thread.name}
                    className="w-13 h-13 rounded-2xl object-cover ring-2 ring-[#ffdad2]"
                  />
                  {thread.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#fd6a49] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-[#070235] truncate flex items-center gap-1">
                      <span>{thread.name}</span>
                      {thread.isGroup ? (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#1e1b4b] text-white text-[9px] font-semibold">
                          Group
                        </span>
                      ) : (
                        <span
                          className="material-symbols-outlined text-[#fd6a49] text-[15px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </h3>
                    <span className="text-[11px] text-[#787680]">{thread.lastTimestamp}</span>
                  </div>

                  <p className="text-xs text-[#47464f] truncate">
                    {thread.lastMessage}
                  </p>

                  {thread.statusText && (
                    <span className="text-[10px] text-[#787680] mt-1 block">
                      {thread.statusText}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Active Conversation View */
        <div className="flex flex-col flex-1 bg-white rounded-3xl shadow-sm border border-[#1e1b4b]/5 overflow-hidden">
          {/* Conversation Header */}
          <div className="p-3.5 sm:p-4 bg-[#faf9f6] border-b border-[#1e1b4b]/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectThread('')}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#e9e8e5] text-[#070235] flex items-center justify-center transition-colors"
                title="Back to list"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>

              <img
                src={currentThread.avatar}
                alt={currentThread.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ffdad2]"
              />

              <div>
                <h3 className="text-sm font-bold text-[#070235] flex items-center gap-1">
                  <span>{currentThread.name}</span>
                  {!currentThread.isGroup && (
                    <span
                      className="material-symbols-outlined text-[#fd6a49] text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  )}
                </h3>
                <span className="text-[11px] text-[#47464f]">
                  {currentThread.statusText || 'Active in Bengaluru'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="px-2.5 py-1 rounded-full bg-[#e3dfff] text-[#181445] text-[10px] font-bold">
                Low-Pressure Chat
              </span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf9f6]/40">
            {currentThread.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                {!msg.isMe && (
                  <span className="text-[10px] text-[#787680] ml-2 mb-0.5 font-medium">
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`max-w-[82%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.isMe
                      ? 'bg-[#1e1b4b] text-white rounded-br-xs'
                      : 'bg-white text-[#1a1c1a] border border-[#1e1b4b]/5 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#787680] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Icebreaker suggestions */}
          <div className="px-3 pt-2 bg-white border-t border-[#1e1b4b]/5 overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#787680] uppercase tracking-wider flex-shrink-0">
              Suggestions:
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(prompt)}
                className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-[#f4f3f1] hover:bg-[#ffdad2] text-[#47464f] hover:text-[#3d0600] font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${currentThread.name}...`}
              className="flex-1 h-11 px-4 rounded-full bg-[#f4f3f1] text-xs text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#fd6a49]"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-11 h-11 rounded-full bg-[#fd6a49] disabled:opacity-40 text-white flex items-center justify-center hover:opacity-95 active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
