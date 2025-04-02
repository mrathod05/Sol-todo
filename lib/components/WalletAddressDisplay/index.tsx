import { useState } from "react";

const WalletAddressDisplay = ({ walletAddress }: { walletAddress: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div
      className="bg-gray-800 px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-gray-700 transition-all relative"
      onClick={copyToClipboard}
    >
      {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
      {copied && (
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg">
          Copied!
        </span>
      )}
    </div>
  );
};

export default WalletAddressDisplay;
