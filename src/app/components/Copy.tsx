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
      className="cursor-pointer flex items-center justify-center"
    >
      {copied ? (
        <img src="/images/check.svg" alt="Copied" className="size-6" />
      ) : (
        <img src="/images/clipboard.svg" alt="Copy" className="size-6" />
      )}
    </button>
  );
};

export { Copy };
