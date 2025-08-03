export interface Debate {
  id: number;
  title: string;
  options: string[];
  stakedAmount: number;
  rewardPool: number;
  endTime: number; // Unix timestamp in milliseconds
}
