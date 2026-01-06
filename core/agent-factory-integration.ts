/**
 * 371-OS Agent Factory Integration
 * Entry point for the dynamic agent scaling system
 */

import { AgentFactory } from '../packages/agents/factory';
import { CEOMimi } from '../packages/agents/c-suite/mimi';
import { CTOZara } from '../packages/agents/c-suite/zara';

// Initialize the Agent Factory
const agentFactory = new AgentFactory();

// Initialize core C-Suite agents
const mimi = new CEOMimi();
const zara = new CTOZara();

// Example: Scale documentation pod based on complexity
const complexityScore = 80; // High complexity
agentFactory.scaleDocPod(complexityScore);

// Example: Manually spawn an agent
agentFactory.spawnAgent({
  name: "ChiefOfStaff-01",
  role: "ChiefOfStaff",
  capabilities: ["admin", "coordination", "task_management"],
  cognitiveLoadLimit: 85
});

// Log active agents
console.log("[SYSTEM] Active agents:", agentFactory.getActiveAgents());

export { 
  agentFactory, 
  mimi, 
  zara 
};