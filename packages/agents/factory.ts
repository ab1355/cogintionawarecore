/**
 * Agent Factory - Dynamic Scaling Engine
 * Mission: Agent spawning, lifecycle management, and capability expansion.
 */

import { randomBytes } from "crypto";
import { EconomicEngine } from "../../core/economics";
import type { AgentConfig, AgentInstance, AgentRole } from "./types/index";

export class AgentFactory {
  private activeInstances: Map<string, AgentInstance> = new Map();

  /**
   * Dynamically spawns a new specialized agent based on system requirements.
   */
  public async spawnAgent(config: AgentConfig): Promise<AgentInstance> {
    const id = `agent_${randomBytes(4).toString("hex")}`;
    const wallet = EconomicEngine.generateWallet(`0x371_${config.role.toUpperCase()}_`);

    const instance: AgentInstance = {
      id,
      config,
      walletAddress: wallet.address,
      spawnedAt: new Date().toISOString(),
      status: "active",
    };

    this.activeInstances.set(id, instance);

    console.log(`[FACTORY] Spawned new agent: ${config.name} (${config.role})`);
    console.log(`[FACTORY] Assigned Wallet: ${instance.walletAddress}`);

    return instance;
  }

  /**
   * Scales the Documentation Pod based on codebase complexity.
   */
  public async scaleDocPod(complexityScore: number) {
    if (complexityScore > 75) {
      console.log("[FACTORY] High complexity detected. Spawning Syntax & Architecture Agents.");
      await this.spawnAgent({
        name: "Syntax-01",
        role: "DocAgent",
        capabilities: ["code_optimization", "linting"],
        cognitiveLoadLimit: 90
      });
    }
  }

  public getActiveAgents() {
    return Array.from(this.activeInstances.values());
  }
}