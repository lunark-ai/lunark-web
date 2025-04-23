import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import toast from 'react-hot-toast';
import { Copy } from 'iconoir-react';
import { baseContainerStyle, baseButtonStyle } from '@/constants';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  content: string;
  language: string;
}

export const CodeBlock = ({ content, language }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      toast.success('Copied code to clipboard!');
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`${baseContainerStyle} my-4 w-full rounded-lg`}>
      <div className={`${baseContainerStyle} flex justify-between items-center px-4 py-2 rounded-t-lg border-b border-[#888]/30`}>
        <span className="text-sm font-medium capitalize text-yellow-400">
          {language || 'text'}
        </span>
        <button 
          onClick={handleCopy}
          className={`${baseButtonStyle} rounded-md flex items-center gap-2 text-sky-400 hover:text-sky-400 px-2 py-1`}
        >
          <Copy className="w-3 h-3" />
          <span className="text-xs">
            {isCopied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
      <SyntaxHighlighter 
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '12px',
          backgroundColor: 'transparent',
          fontSize: '14px',
          borderRadius: '0 0 0.5rem 0.5rem'
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};