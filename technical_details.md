## Oneste: Technical Details

### 1. Introduction

Oneste is a decentralized debate platform built on the Etherlink blockchain, designed to gamify discussions and reward participants with crypto. Users can create debates, stake Tezos (XTZ) to support arguments, vote on proposals, and earn rewards based on debate outcomes. This document outlines the technical architecture and key user flows of the Oneste web application.

### 2. Technology Stack

*   **Frontend Framework:** Next.js (React)
*   **Styling:** Tailwind CSS
*   **UI Components:** React-Toastify, React-Tooltip, TSParticles
*   **Blockchain Interaction:** Wagmi, Viem, Sequence SDK
*   **Smart Contracts:** Solidity
*   **Blockchain Network:** Etherlink Testnet (EVM-compatible Layer 2 on Tezos)
*   **Environment Management:** `.env` files

### 3. Technical Architecture

The Oneste application follows a client-side-heavy architecture, with the Next.js frontend directly interacting with the Etherlink blockchain via smart contracts.

#### 3.1. Frontend Overview

The frontend is a Next.js application responsible for the user interface and interaction. It uses React components to display debate information, handle user inputs for creating debates, and manage wallet connections. Key libraries like Wagmi and Viem facilitate communication with the blockchain, while the Sequence SDK enables smart wallet integration.

#### 3.2. Blockchain Interaction Overview

The application communicates with the Etherlink blockchain through deployed Solidity smart contracts. Wagmi hooks are used to send transactions (e.g., creating debates, staking, voting, claiming rewards) and to read blockchain data (e.g., wallet balance). The `NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY` is essential for connecting to the Sequence wallet.

#### 3.3. Smart Contracts Overview

The core logic of the Oneste platform is encapsulated in Solidity smart contracts deployed on Etherlink. These contracts manage the lifecycle of debates, including:
*   **Debate Creation:** Handling the initiation of new debate proposals.
*   **Staking:** Managing user stakes in XTZ.
*   **Voting:** Recording and tallying votes for debate options.
*   **Reward Distribution:** Automating the payout of rewards to winning participants.
*   **Ownership and Platform Fees:** Managing the platform wallet and associated fees.

### 4. User Flows

#### 4.1. User Onboarding
1.  Wallet connection (e.g., for Tezos-compatible wallets).

#### 4.2. Creating a Proposal
1.  Navigate to "Create Proposal".
2.  Enter proposal details, XTZ stakes, and rules.
3.  Deploy Solidity smart contract for the proposal.
4.  Launch proposal.

#### 4.3. Participating in a Proposal
1.  Browse active proposals.
2.  Select a proposal.
3.  Stake tez (XTZ) to vote.
4.  Vote on the proposal.

#### 4.4. Earning Rewards
1.  Participate in debates.
2.  Win debates (as a participant or by voting on the winning side).
3.  Automated crypto payout via smart contract.
4.  Accumulate points and crypto winnings.

### 5. Development Environment Setup

To set up the Oneste project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd oneste-ui
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```
3.  **Configure Environment Variables:**
    *   Create a `.env` file in the root directory.
    *   Copy the contents of `.env.example` into your `.env` file.
    *   Replace `YOUR_SEQUENCE_PROJECT_ACCESS_KEY` with your actual Sequence Project Access Key.
    *   Ensure `NEXT_PUBLIC_CONTRACT_ADDRESS` is set to the deployed address of your `OnesteVoting` smart contract on Etherlink Testnet.
    ```
    NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
    NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY=AQAAAAAA...
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser.

### 6. Future Considerations

*   **Real-time Data:** Implement an indexer or subgraph for efficient data fetching.
*   **User Profiles:** More detailed profiles, achievements, and reputation scores.
*   **Advanced Debate Mechanics:** Explore complex voting systems and moderation.
*   **Mobile Applications:** Native iOS and Android apps.
*   **AI Integration:** AI-powered argument analysis or summarization.