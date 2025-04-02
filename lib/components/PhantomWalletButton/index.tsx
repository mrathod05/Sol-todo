import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const PhantomWalletButton = ({
  title = "Connect wallet",
}: {
  title?: string;
}) => {
  const { connected } = useWallet();

  if (connected) {
    return (
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !transition !rounded-md" />
    );
  }

  return (
    <WalletMultiButton className="[& button]:!bg-yellow !hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2 shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
      {title}
    </WalletMultiButton>
  );
};

export default PhantomWalletButton;
