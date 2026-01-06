export type AgentRole = 
  | "CEO" 
  | "CTO" 
  | "CFO" 
  | "ChiefOfStaff" 
  | "DocAgent" 
  | "Scout";

export interface AgentConfig {
  name: string;
  role: AgentRole;
  capabilities: string[];
  cognitiveLoadLimit: number;
}

export interface AgentInstance {
  id: string;
  config: AgentConfig;
  walletAddress: string;
  spawnedAt: string;
  status: "active" | "hibernating";
}