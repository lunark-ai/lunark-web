"use client"
import { memo, useMemo } from 'react';
import { motion } from "framer-motion";
import Message from '../Message/Message';
import { IMessage } from "@/types/message";
import LoadingIcon from "../Base/LoadingIcon";
import { formatDate } from "@/utils/format";
import Image from 'next/image';

interface MessageListProps {
 messages: IMessage[];
 isAutoScrolling: boolean;
 loading: boolean;
 isStreaming: boolean;
 status?: string;
}

const MessageList = memo(function MessageList({
  messages,
  loading,
  isStreaming,
  status
}: MessageListProps) {
 const groupedMessages = useMemo(() => {
  const groups: { [key: string]: IMessage[] } = {};
  messages.forEach(message => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  return groups;
}, [messages]);

 return (
   <div className="flex flex-col space-y-1 my-4">
    {Object.entries(groupedMessages).map(([date, dateMessages]) => (
      <div key={date}>
        <div className="flex justify-center py-4">
          <div className="px-4 py-1 rounded-full text-gray-600 text-sm">
            {formatDate(date)}
          </div>
        </div>
        {dateMessages.map((message) => (
          <motion.div key={message.id}>
            <div className={`max-w-full overflow-hidden p-4 rounded-xl relative`}>
              <Message message={message} />
            </div>
          </motion.div>
        ))}
      </div>
    ))}
    {(loading || (isStreaming && messages[messages.length - 1]?.role === 'user')) && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 0.4,
          delay: 0.1
        }}
        className="max-w-[80%] p-4 rounded-xl rounded-tl-none mt-4"
      >
        <div className="flex items-center gap-4">
          <Image src={'/images/icons/icon-light.svg'} alt="Lunark AI Icon" width={30} height={30} className="w-7 h-7" />
          {status || "Lunark is thinking..."}
        </div>
      </motion.div>
    )}
   </div>
 );
});

export default MessageList;