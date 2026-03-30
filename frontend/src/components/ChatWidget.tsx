import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatModal from './ChatModal';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-8 z-40 flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black p-6 rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-110 active:scale-95"
        aria-label="Open chat"
      >
        <MessageCircle size={20} />
        <span>Chat with Kenji</span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <ChatModal onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}