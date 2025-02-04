'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Copy, CopyCheck, File } from 'lucide-react';
import { useState } from 'react';

export type HighlightType = 'add' | 'remove' | 'none';

interface CodeBlockProps {
  code: string;
  title?: string;
  highlightedLines?: {
    line: number;
    type: HighlightType;
  }[];
  showLineNumbers?: boolean;
  maxLines?: number;
  maxWidth?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  title,
  highlightedLines = [],
  showLineNumbers = true,
  maxLines = 20,
  maxWidth = 'max-w-4xl',
}) => {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  const calculateMaxHeight = (lines: number) => {
    const lineHeight = 1.5;
    const padding = 1.3;
    return `calc(${lineHeight}rem * ${lines} + ${padding}rem)`;
  };

  const handleCopy = () => {
    const textToCopy = lines
      .filter((_, index) => {
        const lineNumber = index + 1;
        const highlight = highlightedLines.find(h => h.line === lineNumber);
        return !highlight || highlight.type !== 'remove';
      })
      .join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`relative text-left group w-full ${maxWidth}`}>
      {title && (
        <div className="rounded-t-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
          <span className="flex items-center gap-2">
            <File className="h-4 w-4 text-gray-400" />
            {title}
          </span>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 p-1 rounded-lg
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition-colors"
        aria-label="コードをコピー"
      >
        {copied ? (
          <CopyCheck className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-500" />
        )}
      </button>
      <ScrollArea type="scroll"
        className={`bg-gray-100 dark:bg-gray-950 p-2 w-full overflow-auto border border-gray-300 dark:border-gray-700 ${
          title ? 'rounded-b-md border-t-0' : 'rounded-md'
        }`}
      >
        <div 
          className="w-full"
          style={{ maxHeight: calculateMaxHeight(maxLines) }}
        >
          <code className="text-gray-900 dark:text-gray-100">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const highlight = highlightedLines.find(h => h.line === lineNumber);
              
              return (
                <div
                  key={lineNumber}
                  className={`flex ${
                    highlight
                      ? highlight.type === 'remove'
                        ? 'bg-red-100/50 dark:bg-red-900/50'
                        : 'bg-green-100/50 dark:bg-green-900/50'
                      : ''
                  }`}
                >
                  {showLineNumbers && (
                    <span className="select-none w-12 inline-block text-gray-400 dark:text-gray-500 text-right pr-4 flex-shrink-0">
                      {lineNumber}
                    </span>
                  )}
                  <span className="select-none w-4 inline-block text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {highlight ? (highlight.type === 'add' ? '+' : highlight.type === 'remove' ? '-' : ' ') : ' '}
                  </span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              );
            })}
          </code>
        </div>
        <ScrollBar orientation="vertical" />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
