'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'react-toastify';
import { VoteConfirmationCard } from './VoteConfirmationCard';
import { Debate } from '@/types';

// Placeholder for your deployed smart contract address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
console.log('DebateCard: contractAddress', contractAddress);

// Placeholder for your smart contract ABI (simplified for staking function)
const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_debateId",
        "type": "uint256"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_debateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_optionIndex",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

interface DebateCardProps {
  debate: Debate;
}

export function DebateCard({ debate }: DebateCardProps) {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [votingOptionIndex, setVotingOptionIndex] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false); // New state for voting indication
  const [userVotedOptionIndex, setUserVotedOptionIndex] = useState<number | null>(null);
  const [showVoteConfirmation, setShowVoteConfirmation] = useState<boolean>(false);

  const { writeContract: writeStake, data: stakeHash, isPending: isStaking, error: stakeError } = useWriteContract();
  const { writeContract: writeVote, data: voteHash, isPending: isVoting, error: voteError } = useWriteContract();

  const { isLoading: isConfirmingStake, isSuccess: isConfirmedStake } =
    useWaitForTransactionReceipt({
      hash: stakeHash,
    });

  const { isSuccess: isConfirmedVote } =
    useWaitForTransactionReceipt({
      hash: voteHash,
    });

  // --- Refactored useEffect hooks to prevent infinite loops ---

  // Effect for handling staking notifications
  useEffect(() => {
    let toastId: string | number;
    if (isStaking) {
      toastId = toast.info('Staking transaction pending... ⏳', { autoClose: false, closeButton: false });
    }
    // Cleanup function to dismiss toast when staking is no longer pending
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isStaking]);

  useEffect(() => {
    if (isConfirmedStake) {
      toast.success('Stake transaction confirmed! 🎉');
    } else if (stakeError) {
      toast.error(`Stake Error: ${(stakeError as Error & { shortMessage?: string })?.shortMessage || stakeError.message} ❌`);
    }
  }, [isConfirmedStake, stakeError]);

  // Effect for handling voting notifications
  useEffect(() => {
    let toastId: string | number;
    if (isVoting) {
      toastId = toast.info('Vote transaction pending... ⏳', { autoClose: false, closeButton: false });
    }
    // Cleanup function to dismiss toast when voting is no longer pending
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isVoting]);

  useEffect(() => {
    if (isConfirmedVote) {
      toast.success('Vote transaction confirmed! ✅');
      setHasVoted(true);
      setUserVotedOptionIndex(votingOptionIndex);
      setShowVoteConfirmation(true);
    } else if (voteError) {
      toast.error(`Vote Error: ${(voteError as Error & { shortMessage?: string })?.shortMessage || voteError.message} 🛑`);
    }
  }, [isConfirmedVote, voteError, votingOptionIndex]);

  const handleStakeAmountChange = (amount: string) => {
    setStakeAmount(parseFloat(amount) || 0);
  };

  const handleStake = () => {
    if (stakeAmount > 0) {
      try {
        writeStake({
          address: contractAddress,
          abi: contractAbi,
          functionName: 'stake',
          args: [BigInt(debate.id)], // Assuming debateId is passed as uint256
          value: parseEther(stakeAmount.toString()), // Convert XTZ to wei
        });
      } catch (err) {
        console.error("Error preparing transaction:", err);
      }
    } else {
      console.log(`Invalid stake amount for debate ID: ${debate.id}`);
    }
  };

  const handleVote = (optionIndex: number) => {
    setVotingOptionIndex(optionIndex);
    try {
      writeVote({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'vote',
        args: [BigInt(debate.id), BigInt(optionIndex)],
      });
    } catch (err) {
      console.error("Error preparing vote transaction:", err);
      setVotingOptionIndex(null); // Reset if error occurs before transaction is sent
    }
  };

  return (
    <div key={debate.id} className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-3xl border border-gray-700 transform hover:scale-105 hover:border-blue-500 hover:shadow-blue-500/50 transition-all duration-300">
      <h3 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-blue-300">{debate.title}</h3>
      <p className="text-gray-300 mb-3 text-sm sm:text-base" data-tooltip-id="gamelike-tooltip" data-tooltip-content="The total amount of Tezos (XTZ) currently staked on this debate.">Staked: {debate.stakedAmount} XTZ</p>
      <div className="flex flex-col space-y-2 sm:space-y-3">
        {debate.options.map((voteOption, index) => (
          <button key={index} 
            onClick={() => handleVote(index)}
            className={`px-4 py-2 sm:px-6 sm:py-3 font-bold rounded-full text-sm sm:text-base transition-all duration-300
              ${hasVoted 
                ? (userVotedOptionIndex === index ? 'bg-green-600' : 'bg-gray-500 cursor-not-allowed') 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            disabled={hasVoted || (isVoting && votingOptionIndex === index)}
          >
            {hasVoted 
              ? (userVotedOptionIndex === index ? 'Your Vote' : voteOption) 
              : (isVoting && votingOptionIndex === index) ? 'Voting...' : `Vote ${voteOption}`
            }
          </button>
        ))}
      </div>
      {hasVoted && userVotedOptionIndex !== null && (
        <p className="text-md text-green-400 mt-4">You voted for: {debate.options[userVotedOptionIndex]}</p>
      )}
      {showVoteConfirmation && userVotedOptionIndex !== null && (
        <VoteConfirmationCard
          debateTitle={debate.title}
          votedOption={debate.options[userVotedOptionIndex]}
          onClose={() => setShowVoteConfirmation(false)}
        />
      )}
      <div className="mt-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="number"
          placeholder="Stake XTZ"
          data-tooltip-id="gamelike-tooltip"
          data-tooltip-content="Enter the amount of Tezos (XTZ) you wish to stake on this debate."
          value={stakeAmount || ''}
          onChange={(e) => handleStakeAmountChange(e.target.value)}
          className="w-full px-3 py-2 rounded-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <button
          onClick={handleStake}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full text-sm sm:text-base transition-all duration-300"
          disabled={isStaking || isConfirmingStake}
        >
          {(isStaking || isConfirmingStake) ? 'Staking...' : 'Stake'}
        </button>
      </div>
      </div>
  );
}
