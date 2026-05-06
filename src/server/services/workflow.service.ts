import { agentService } from './agent.service';
import { streamService } from './stream.service';
import { policyService } from './policy.service';
import { transactionService } from './transaction.service';

export const workflowService = {
  /**
   * Execute a multi-step financial workflow
   * Actions: 'deploy_agent' | 'start_stream' | 'set_policy' | 'payment'
   */
  async executeWorkflow(steps: any[]) {
    const results = [];

    for (const step of steps) {
      console.log(`--- Executing Workflow Step: ${step.type} ---`);
      
      try {
        let result;
        switch (step.type) {
          case 'deploy_agent':
            // Call the agent creation logic (mocked for demo logic)
            result = { success: true, message: `Agent ${step.data.name} deployed.` };
            break;
          case 'start_stream':
            result = await streamService.createStream(step.data);
            break;
          case 'set_policy':
            result = await policyService.createPolicy(step.data);
            break;
          case 'payment':
            // Logic for a single payment
            result = { success: true, message: `Payment of ${step.data.amount} executed.` };
            break;
          default:
            throw new Error(`Unknown step type: ${step.type}`);
        }
        results.push({ step: step.type, ...result });
      } catch (error) {
        console.error(`Step ${step.type} failed:`, error);
        results.push({ step: step.type, success: false, error: (error as Error).message });
      }
    }

    return results;
  }
};
