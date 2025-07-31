'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'react-toastify';

// Placeholder for your deployed smart contract address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

// Placeholder for your smart contract ABI (simplified for claim function)
const contractAbi = [
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export function RewardDisplay() {
  const [claimToastId, setClaimToastId] = useState<string | null>(null);

  // TODO: Implement logic to fetch actual user rewards from smart contract or indexer
  // For now, using mock data

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isPending) {
      const id = toast.info('Claim transaction pending... ⏳', { autoClose: false, closeButton: false });
      setClaimToastId(id as string);
    } else if (claimToastId) {
      toast.dismiss(claimToastId);
      setClaimToastId(null);
    }

    if (isConfirmed) {
      toast.success('Rewards claimed successfully! 💰');
    } else if (error) {
      toast.error(`Claim Error: ${(error as any)?.shortMessage || (error as any).message} 🛑`); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }, [isPending, isConfirmed, error, claimToastId]);

  const handleClaimRewards = () => {
    try {
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'claimRewards',
      });
    } catch (err) {
      console.error("Error preparing claim transaction:", err);
    }
  };

  return (
    <section className="mt-20 w-full max-w-4xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        Your Rewards
      </h2>
      <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 inline-block">
        <p className="text-3xl font-semibold mb-4 text-white" data-tooltip-id="gamelike-tooltip" data-tooltip-content="Your earned Tezos (XTZ) rewards from winning debates.">XTZ: 0.00</p>
        <p className="text-3xl font-semibold mb-6 text-white" data-tooltip-id="gamelike-tooltip" data-tooltip-content="Your accumulated in-game points from participating in debates and voting.">Points: 0</p>
        <button
          onClick={handleClaimRewards}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
          disabled={isPending || isConfirming}
        >
          {(isPending || isConfirming) ? 'Claiming...' : 'Claim Rewards'}
        </button>
      </div>
    </section>
  );
}
