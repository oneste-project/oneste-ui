'use client';

import { DebateCard } from './DebateCard';

interface Debate {
  id: number;
  title: string;
  options: string[];
  stakedAmount: number;
}

const mockDebates: Debate[] = [
  {
    id: 1,
    title: 'Should we add a new map?',
    options: ['Yes', 'No'],
    stakedAmount: 100,
  },
  {
    id: 2,
    title: 'Should we introduce a new character?',
    options: ['Yes', 'No'],
    stakedAmount: 75,
  },
  {
    id: 3,
    title: 'Should we implement a new game mode?',
    options: ['Yes', 'No'],
    stakedAmount: 120,
  },
];

export function DebateList() {
  return (
    <section className="mt-20 w-full max-w-4xl mx-auto">
      <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 text-center">
        Active Debates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockDebates.map((debate) => (
          <DebateCard key={debate.id} debate={debate} />
        ))}
      </div>
    </section>
  );
}