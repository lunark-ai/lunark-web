"use client"
import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './CodeBlock'
import { processText } from './ProcessText';
import { IMessage } from '@/types/message';
import { ToolComponents } from './ToolComponents';
import { TransactionUI } from './TransactionUI';
import { baseContainerStyle } from '@/constants';
import LongTermMemory from './LongTermMemory';
import { useGlobalContext } from '@/contexts';

interface MessageContentProps {
 message: IMessage;
}

const MessageContent = ({ message }: MessageContentProps) => {
 const { setIsSettingsOpen, setSelectedMenu } = useGlobalContext();

 const handleSettingsOpen = () => {
   setSelectedMenu('memory');
   setIsSettingsOpen(true);
 };

 const displayContent = message.content;
 if (!displayContent) return null;
 
 const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
 const parts = [];
 let lastIndex = 0;
 let match;

 while ((match = codeBlockRegex.exec(displayContent)) !== null) {
   if (match.index > lastIndex) {
     const textContent = displayContent.slice(lastIndex, match.index);
     if (textContent.trim()) {
       parts.push({
         type: 'text',
         content: textContent
       });
     }
   }
   
   const [_, language, codeContent] = match;
   if (codeContent) {
     parts.push({
       type: 'code',
       content: codeContent.trim(),
       language: language || 'text'
     });
   }
   lastIndex = match.index + match[0].length;
 }

 if (lastIndex < displayContent.length) {
   const remainingText = displayContent.slice(lastIndex);
   if (remainingText.trim()) {
     parts.push({
       type: 'text',
       content: remainingText
     });
   }
 }

 return (
   <div className="flex flex-col w-full overflow-hidden">     
     {parts.map((part, index) => (
       <div key={index} className="mb-2 last:mb-0">
         {part.type === 'code' ? (
           <CodeBlock content={part.content} language={part.language!} />
         ) : (
           <ReactMarkdown
             className="text-sm sm:text-base space-y-4"
             components={{
               h1: ({node, ...props}) => <h1 className={`font-semibold block mt-6 mb-2 p-2 rounded-lg`}>{processText(props.children)}</h1>,
               h2: ({node, ...props}) => <h2 className={`font-semibold block mt-6 mb-2 p-2 rounded-lg`}>{processText(props.children)}</h2>,
               h3: ({node, ...props}) => <h3 className={`font-semibold block mt-6 mb-2 p-2 rounded-lg`}>{processText(props.children)}</h3>,
               h4: ({node, ...props}) => <h4 className={`font-semibold block mt-6 mb-2 p-2 rounded-lg`}>{processText(props.children)}</h4>,
               h5: ({node, ...props}) => <h5 className={`font-semibold block mt-6 mb-2 p-2 rounded-lg`}>{processText(props.children)}</h5>,
               h6: ({node, ...props}) => <h6 className={`font-semibold block mt-6 mb-2 p-2 rounded-lg`}>{processText(props.children)}</h6>,
               p: ({node, ...props}) => {
                 const childrenText = props.children?.toString() || '';
                 const hasMultipleParagraphs = childrenText.includes('\n\n');
                 return (
                   <p className={`${hasMultipleParagraphs ? "my-6" : ""}`}>
                     {processText(props.children)}
                   </p>
                 );
               },
               strong: ({node, ...props}) => <span className="font-semibold">{processText(props.children)}</span>,
               em: ({node, ...props}) => <em>{processText(props.children)}</em>,
               li: ({node, ...props}) => (
                 <li className="flex items-start mb-2">
                   <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-2`}>•</span>
                   <span>{processText(props.children)}</span>
                 </li>
               ),
               ul: ({node, ...props}) => <ul className="my-2">{props.children}</ul>,
               ol: ({node, ...props}) => <ol className="my-2">{props.children}</ol>,
               code: ({node, ...props}) => (
                 <code className={`${baseContainerStyle} inline-block px-2 py-0.5 rounded text-sm font-mono text-pink-600`}>
                   {props.children}
                 </code>
               )
             }}
           >
             {part.content}
           </ReactMarkdown>
         )}
         {message.memories && message.memories.map((memory, index) => (
           <LongTermMemory key={index} memory={memory} onSettingsOpen={handleSettingsOpen} />
         ))}
         {message.transaction && <TransactionUI transaction={message.transaction} />}
         {message.toolData && ToolComponents[(message.toolData as any).component]?.({ data: (message.toolData as any).data })}
       </div>
     ))}
   </div>
 );
};

export default MessageContent;