'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'react-toastify';

// Placeholder for your deployed smart contract address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

// Placeholder for your smart contract ABI (simplified for createDebate function)
const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "_options",
        "type": "string[]"
      }
    ],
    "name": "createDebate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

export function CreateDebate() {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(''); // Comma-separated options
  const [rewardPool, setRewardPool] = useState<number>(0); // This will be the value sent with the transaction
  const [minVoteAmount, setMinVoteAmount] = useState<number>(0); // New state for minVoteAmount
  const platformFee = 0.1; // 0.1 XTZ platform fee
  const amountForVoters = Math.max(0, rewardPool - platformFee);

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    let toastId: string | number | null = null;

    if (isPending) {
      toastId = toast.info('Creating debate... ⏳', { autoClose: false, closeButton: false });
    } else if (toastId) {
      toast.dismiss(toastId);
      toastId = null;
    }

    if (isConfirmed) {
      toast.success('Debate created successfully! 🎉');
      setTitle('');
      setOptions('');
      setRewardPool(0);
    } else if (error) {
      console.error("Error creating debate:", error);
      toast.error(`Error creating debate: ${error.shortMessage || error.message} ❌`);
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isPending, isConfirmed, error, hash]);

  const handleCreateDebate = () => {
    if (!title || !options || rewardPool <= 0 || minVoteAmount < 0) {
      toast.error('Please fill all fields and ensure reward pool is greater than 0 and minimum vote amount is not negative. 🛑');
      return;
    }

    const optionsArray = options.split(',').map(opt => opt.trim());
    if (optionsArray.length === 0 || optionsArray.some(opt => opt === '')) {
      toast.error('Please provide valid comma-separated options. 🛑');
      return;
    }

    // Generate a unique debateId (for simplicity, using current timestamp)
    const debateId = Date.now();

    // Convert string options to numerical proposalIds (using index as ID)
    const proposalIds = optionsArray.map((_, index) => BigInt(index + 1)); // Start from 1 to avoid 0

    // Ensure the value sent is at least the platform fee
    const valueToSend = parseEther(rewardPool.toString());
    if (valueToSend < parseEther(platformFee.toString())) {
      toast.error(`Reward pool must be at least ${platformFee} XTZ to cover platform fee. 🛑`);
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'createDebate',
        args: [BigInt(debateId), proposalIds, BigInt(minVoteAmount)],
        value: valueToSend,
      });
    } catch (err) {
      console.error("Error preparing create debate transaction:", err);
    }
  };

  return (
    <section className="mt-20 w-full max-w-4xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        Create New Debate
      </h2>
      <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 inline-block text-left w-full">
        <div className="mb-4">
          <label htmlFor="debateTitle" className="block text-gray-300 text-lg font-semibold mb-2">Debate Title</label>
          <input
            type="text"
            id="debateTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Best new map: Forest vs. City?"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="debateOptions" className="block text-gray-300 text-lg font-semibold mb-2">Options (comma-separated)</label>
          <input
            type="text"
            id="debateOptions"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Forest, City"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="rewardPool" className="block text-gray-300 text-lg font-semibold mb-2">Reward Pool (XTZ)</label>
          <input
            type="number"
            id="rewardPool"
            value={rewardPool || ''}
            onChange={(e) => setRewardPool(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 5"
          />
          <p className="text-sm text-gray-400 mt-2">Platform Fee: {platformFee} XTZ (0.1 XTZ deducted)</p>
          <p className="text-sm text-gray-400">Amount for Voters: {amountForVoters.toFixed(2)} XTZ</p>
        </div>
        <div className="mb-6">
          <label htmlFor="minVoteAmount" className="block text-gray-300 text-lg font-semibold mb-2">Minimum Vote Amount (XTZ)</label>
          <input
            type="number"
            id="minVoteAmount"
            value={minVoteAmount || ''}
            onChange={(e) => setMinVoteAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 0.1"
          />
          <p className="text-sm text-gray-400 mt-2">Minimum amount required to vote in this debate.</p>
        </div>
        <button
          onClick={handleCreateDebate}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-bold rounded-full shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50"
          disabled={isPending || isConfirming}
        >
          {(isPending || isConfirming) ? 'Creating...' : 'Create Debate'}
        </button>
      </div>
    </section>
  );
}
