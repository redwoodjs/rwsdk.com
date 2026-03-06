"use client";

import { useState } from "react";

const Copy = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer flex items-center justify-center ml-4"
    >
      {copied ? (
        <img src="/images/check.svg" alt="Copied" className="size-4" />
      ) : (
        <img src="/images/clipboard.svg" alt="Copy" className="size-4" />
      )}
    </button>
  );
};

export { Copy };
