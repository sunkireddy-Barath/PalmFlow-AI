import { 
  Connection, 
  PublicKey, 
  clusterApiUrl, 
  Keypair, 
  Transaction,
  sendAndConfirmTransaction 
} from '@solana/web3.js';
import { 
  getAccount, 
  getAssociatedTokenAddress, 
  createTransferInstruction,
  getMint
} from '@solana/spl-token';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const PUSD_MINT = new PublicKey(process.env.NEXT_PUBLIC_PUSD_MINT!);

export const solanaService = {
  /**
   * Get the live on-chain balance of PUSD for a given wallet
   */
  async getPUSDBalance(walletAddress: string) {
    try {
      const publicKey = new PublicKey(walletAddress);
      const ata = await getAssociatedTokenAddress(PUSD_MINT, publicKey);
      const account = await getAccount(connection, ata);
      const mintInfo = await getMint(connection, PUSD_MINT);
      
      return Number(account.amount) / Math.pow(10, mintInfo.decimals);
    } catch (error) {
      console.error('Error fetching PUSD balance:', error);
      return 0;
    }
  },

  /**
   * Execute an on-chain payment from the Treasury to a recipient
   */
  async executePayment(recipientAddress: string, amount: number) {
    try {
      const authoritySecret = JSON.parse(process.env.PUSD_AUTHORITY_KEY!);
      const authority = Keypair.fromSecretKey(Uint8Array.from(authoritySecret));
      const recipient = new PublicKey(recipientAddress);
      
      const fromAta = await getAssociatedTokenAddress(PUSD_MINT, authority.publicKey);
      const toAta = await getAssociatedTokenAddress(PUSD_MINT, recipient);
      
      const mintInfo = await getMint(connection, PUSD_MINT);
      const amountInBaseUnits = BigInt(amount * Math.pow(10, mintInfo.decimals));

      const transaction = new Transaction().add(
        createTransferInstruction(
          fromAta,
          toAta,
          authority.publicKey,
          amountInBaseUnits
        )
      );

      const signature = await sendAndConfirmTransaction(connection, transaction, [authority]);
      return signature;
    } catch (error) {
      console.error('On-chain payment failed:', error);
      throw error;
    }
  }
};
