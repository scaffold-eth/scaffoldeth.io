"use client";

import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyToClipBoardButton({ text, className = "" }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 800);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <div className={`flex items-center gap-2 cursor-pointer ${className}`}>
        <p className="m-0 text-sm font-bold text-center sm:text-base">{text}</p>
        {isCopied ? (
          <CheckCircleIcon className="flex-shrink-0 w-4 h-6 text-xl font-normal cursor-pointer" aria-hidden="true" />
        ) : (
          <DocumentDuplicateIcon
            className="flex-shrink-0 w-4 h-6 text-xl font-normal cursor-pointer"
            aria-hidden="true"
          />
        )}
      </div>
    </CopyToClipboard>
  );
}
