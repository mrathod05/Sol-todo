import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { MAX_PROGRAM_CONNECTION_RETRY, PROGRAM_ID } from "../data";
import { useCallback, useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

const programId = new PublicKey(PROGRAM_ID);

const useProgram = () => {
  const [program, setProgram] = useState<Program | null>(null);

  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const getProgram = useCallback(() => {
    if (!wallet) return;

    const provider = new AnchorProvider(connection, wallet, {
      maxRetries: MAX_PROGRAM_CONNECTION_RETRY,
    });

    const idl: Idl = require("../idl/todo_idl.json");

    const program = new Program(idl, programId, provider);
    setProgram(program);
  }, [connection, wallet]);

  useEffect(() => {
    getProgram();
  }, [connection, wallet]);

  return program;
};

export default useProgram;
