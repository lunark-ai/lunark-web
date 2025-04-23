"use client"

import { baseButtonStyle, baseContainerStyle } from "@/constants";
import { Copy, ThumbsDown, ThumbsUp } from "iconoir-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface MessageActionsProps {
  content: string;
  role: string;
}

export default function MessageActions({ content, role }: MessageActionsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.trim());
      setIsCopied(true);
      toast.success('Copied message to clipboard!');
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success('Thanks for the feedback!');
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    toast.success('Thanks for the feedback!');
    if (isLiked) setIsLiked(false);
  };

  return (
    <div className={`absolute ${role === 'user' ? 'right-2' : 'left-2'} -bottom-6`}>
      <div className={`${baseContainerStyle} flex items-center gap-1 px-1 py-1 rounded-lg`}>
        <button 
          onClick={handleCopy}
          className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-1 h-[18px] w-[50px] sm:h-[20px] sm:w-[60px] text-sky-600 hover:text-sky-500`}
        >
          {!isCopied && <Copy className="w-3 h-3" />}
          <span className="text-[10px] sm:text-[12px]">
            {isCopied ? 'Copied!' : 'Copy'}
          </span>
        </button>
        <button 
          onClick={handleLike}
          className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-2 h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] ${
            isLiked ? 'text-green-500' : 'text-green-600 hover:text-green-500'
          }`}
        >
          <ThumbsUp className="w-3 h-3" />
        </button>
        <button 
          onClick={handleDislike}
          className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-2 h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] ${
            isDisliked ? 'text-rose-500' : 'text-rose-600 hover:text-rose-500'
          }`}
        >
          <ThumbsDown className="w-3 h-3" />
        </button>
        </div>
    </div>
  );
}