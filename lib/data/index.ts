export const PROGRAM_ID = "4BBrKAMPPapLUnZrwiXN5akvtt3g69C5ZtqAGFSDNGTU";

export const MAX_PROGRAM_CONNECTION_RETRY = 2;

export const applicationData = {
  app: {
    name: "Sol-todo",
    link: "https://sol-todo.netlify.app",
  },
  developer: {
    name: "Meet Rathod",
    link: "https://meetrathoddeveloper.netlify.app",
  },
};

export const META_DATA = {
  metadataBase: new URL("https://sol-todo.netlify.app"), // Update with actual app URL
  title: "Sol-Todo: Solana To-Do App",
  description:
    "Sol-Todo is a decentralized To-Do application built on the Solana blockchain using Next.js and Phantom Wallet for seamless Web3 integration.",
  keywords: [
    "Solana",
    "Next.js",
    "dApps",
    "Decentralized Applications",
    "Blockchain",
    "Web3",
    "To-Do List",
    "Phantom Wallet",
    "Task Management",
  ],
  author: "Meet Rathod", // Update if needed
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sol-todo.netlify.app", // Update with actual app URL
    title: "Sol-Todo: Solana To-Do App",
    description:
      "Sol-Todo is a decentralized To-Do application built on the Solana blockchain using Next.js and Phantom Wallet for seamless Web3 integration.",
    siteName: "Sol-Todo",
    images: [
      {
        url: "/sol-todo-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Sol-Todo: Solana To-Do App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sol-Todo: Solana To-Do App",
    description:
      "Sol-Todo is a decentralized To-Do application built on the Solana blockchain using Next.js and Phantom Wallet for seamless Web3 integration.",
    images: ["/sol-todo-logo.jpeg"],
  },
};
