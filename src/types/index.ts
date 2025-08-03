export interface Debate {
  id: number;
  title: string;
  options: string[];
  stakedAmount: number;
  endTime: number; // Unix timestamp in milliseconds
}
