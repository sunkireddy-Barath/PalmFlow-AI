import { solanaService } from './solana.service';
import { transactionService } from './transaction.service';

// Mock Yield Vault Address on Devnet
const YIELD_VAULT_ADDRESS = "JitoYieldVaultAddress111111111111111111111111";

export const yieldService = {
  /**
   * Automatically route idle PUSD to a yield-bearing vault
   */
  async routeToYield(amount: number) {
    try {
      console.log(`--- Routing ${amount} PUSD to Yield Engine ---`);
      
      // Execute the real on-chain transfer to the vault
      const txHash = await solanaService.executePayment(YIELD_VAULT_ADDRESS, amount);

      // Record as a Yield Investment
      await transactionService.createTransaction({
        amount: amount,
        type: 'yield_investment',
        description: `Autonomous Yield Routing: Treasury -> Jito PUSD Vault`,
        txHash: txHash
      });

      return { success: true, txHash };
    } catch (error) {
      console.error('Yield routing failed:', error);
      throw error;
    }
  }
};
