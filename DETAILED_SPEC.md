# Detailed Application Specification

This document contains comprehensive information about the Oneste application, its features, and technical details.

## Table of Contents

- [Introduction](#introduction)
- [Core Features](#core-features)
- [User Flows](#user-flows)
- [Technical Architecture](#technical-architecture)
- [Future Enhancements](#future-enhancements)

## Introduction

Oneste is a game for a hackathon on Etherlink, a Tezos layer-2 blockchain with EVM compatibility. It features a simple voting system where players stake Tezos (XTZ) to vote on in-game proposals (e.g., 'Add new map' vs. 'New character') and earn crypto rewards. It combines elements of social interaction, competitive gaming, and blockchain-based financial incentives to create a unique and transparent user experience.

## Core Features

### Debate Creation
- Users can initiate new proposals (e.g., 'Add new map' vs. 'New character').
- Proposals can be public or private.
- Option to set a crypto stake (tez (XTZ)) for the proposal.
- Define clear proposal parameters and rules, enforced by Solidity smart contracts on Etherlink.

### Joining Proposals
- Browse active proposals by category, popularity, or stake size.
- Join a proposal by selecting a side (e.g., 'Add new map' vs. 'New character').
- Players must stake XTZ to vote on a proposal.

### Voting
- Players vote on proposals.
- Voting results are transparently recorded on the blockchain.
- Anti-fraud measures for voting, potentially leveraging blockchain properties.

### Voting Mechanism
- Community voting: Users vote for the argument they find most compelling.
- Expert judge voting: Option for debates to be judged by pre-selected experts.
- Voting period with clear start and end times.
- Voting results are transparently recorded on the blockchain.
- Anti-fraud measures for voting, potentially leveraging blockchain properties.

### Reward Distribution
- Winners (those on the side with the most votes) split the total staked XTZ.
- Players earn 0.05 XTZ + 50 in-game points per vote, with bonuses for winning votes.
- Payouts are automated and secured by Solidity smart contracts.
- Leaderboards based on points and crypto winnings.

## User Flows

### User Onboarding
1. Sign up/Login.
2. Profile creation (optional).
3. Wallet connection (e.g., for Tezos-compatible wallets).

### Creating a Proposal
1. Navigate to "Create Proposal".
2. Enter proposal details, XTZ stakes, and rules.
3. Deploy Solidity smart contract for the proposal.
4. Launch proposal.

### Participating in a Proposal
1. Browse active proposals.
2. Select a proposal.
3. Stake tez (XTZ) to vote.
4. Vote on the proposal.

### Earning Rewards
1. Participate in debates.
2. Win debates (as a participant or by voting on the winning side).
3. Automated crypto payout via smart contract.
4. Accumulate points and crypto winnings.

## Technical Architecture

### Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI (or similar headless UI library for accessibility)
- **State Management:** React Context API or Zustand/Jotai (for simplicity)
- **Blockchain Interaction:** Ethers.js (for EVM interaction) or similar library.

### Backend (Conceptual)
- **Smart Contracts:** Developed in Solidity (for Etherlink EVM) to manage proposal logic, staking, voting, and payouts.
- **Indexer/API:** A service to index blockchain data for faster querying and provide off-chain data (e.g., proposal details, player profiles).
- **Real-time Communication:** WebSockets (for live updates, potentially from indexer).
- **Authentication:** Wallet-based authentication (e.g., using MetaMask or Temple wallet).

### Deployment
- Vercel for Frontend (Next.js)
- Etherlink (Tezos layer-2 blockchain with EVM compatibility) for smart contracts.
- Decentralized storage (e.g., IPFS) for debate content (optional).

## Future Enhancements

- **User Profiles:** More detailed profiles, achievements, and reputation scores (on-chain and off-chain).
- **Live Debates:** Real-time text or voice debates, potentially leveraging decentralized communication protocols.
- **Moderation Tools:** Advanced tools for content moderation and dispute resolution, potentially involving decentralized autonomous organizations (DAOs).
- **Mobile Applications:** Native iOS and Android apps with integrated wallet functionality.
- **Advanced Analytics:** On-chain and off-chain analytics for user and debate performance.
- **AI Integration:** AI-powered argument analysis or summarization, potentially integrated with smart contracts for objective evaluation.