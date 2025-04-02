import React from "react";

import Home from "@/lib/components/Home";
import { ClientWalletProvider } from "@/lib/components/Providers/WalletProvider";

const Page = () => {
  return (
    <ClientWalletProvider>
      <Home />
    </ClientWalletProvider>
  );
};

export default Page;
