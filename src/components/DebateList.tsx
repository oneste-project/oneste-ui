'use client';

import { DebateCard } from './DebateCard';
import { Debate } from '@/types';

interface DebateListProps {
  debates: Debate[];
}

export function DebateList({ debates }: DebateListProps) {
  return (
    <section className="mt-20 w-full max-w-4xl mx-auto">
      <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 text-center">
        Active Debates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {debates.map((debate) => (
          <DebateCard key={debate.id} debate={debate} />
        ))}
      </div>
    </section>
  );
}