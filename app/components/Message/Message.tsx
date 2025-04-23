"use client"
import { useUserContext } from "@/contexts";
import { IMessage } from "@/types/message";
import { motion } from "framer-motion";
import MessageActions from "./MessageActions";
import MessageContent from "./MessageContent";
import { memo, useEffect } from 'react';
import { baseContainerStyle } from "@/constants";

interface MessageProps {
  message: IMessage;
}

export default memo(function Message({ message }: MessageProps) {
  const { user } = useUserContext();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} w-full`}
    >
      <div className={`flex flex-col gap-2 w-full ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`group max-w-[95%] w-fit p-4 ${baseContainerStyle} rounded-xl shadow-sm break-words relative`}>
          <MessageContent message={message} />
          <MessageActions content={message.content} role={message.role} />
        </div>
        <div className={`text-xs text-[#4F6263] mt-6 mx-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          {message.role === 'user' ? user?.address.slice(0, 4) + '...' + user?.address.slice(-4) + ' - ' : 'Lunark' + ' - '}
          {new Date(message.createdAt).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </motion.div>
  );
}, (prevProps: MessageProps, nextProps: MessageProps) => {
  return prevProps.message.content === nextProps.message.content;
});