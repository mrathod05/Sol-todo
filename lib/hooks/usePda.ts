import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "../data";

const programId = new PublicKey(PROGRAM_ID);

const usePda = () => {
  const getTodoPda = (id: number, authority: PublicKey) => {
    const [todoPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("todo"), authority.toBuffer(), new Uint8Array([id])],
      programId
    );
    return todoPDA;
  };

  return {
    getTodoPda,
  };
};

export default usePda;
