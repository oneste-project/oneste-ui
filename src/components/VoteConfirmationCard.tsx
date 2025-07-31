'use client';

import React from 'react';

interface VoteConfirmationCardProps {
  debateTitle: string;
  votedOption: string;
  onClose: () => void;
}

export function VoteConfirmationCard({ debateTitle, votedOption, onClose }: VoteConfirmationCardProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-blue-500 rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-green-400 mb-4">Vote Confirmed!</h2>
        <p className="text-xl text-gray-200 mb-2">You have successfully cast your vote.</p>
        <p className="text-lg text-gray-300 mb-1">Debate: <span className="font-semibold text-white">&quot;{debateTitle}&quot;</span></p>
        <p className="text-lg text-gray-300 mb-6">Your Vote: <span className="font-semibold text-blue-400">&quot;{votedOption}&quot;</span></p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
