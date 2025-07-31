# Oneste UI

Oneste is a decentralized debate application built on the Etherlink blockchain, designed to gamify discussions and reward participants with crypto. Users can create debates, stake Tezos (XTZ) to support arguments, vote on proposals, and earn rewards based on debate outcomes. This frontend provides the user interface for interacting with the Oneste smart contracts.

## How It Works

Oneste combines elements of social interaction, competitive gaming, and blockchain-based financial incentives to create a unique and transparent user experience. Here's a quick overview:

1.  **Join a Debate:** Pick a topic you care about—music, politics, sports, or wild hot takes.
2.  **Back Your Side:** Support your side by staking Tezos (XTZ).
3.  **Vote:** Read both arguments and vote for the one you believe wins. Community or expert judges decide.
4.  **Earn Rewards:** If your side wins, you split the staked pot. You also earn points for voting, winning, and starting debates.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Environment Setup

#### Node.js and npm
Ensure you have Node.js (v18 or later recommended) and npm installed.

#### Obtain Testnet XTZ
You will need testnet XTZ to interact with the smart contracts on Etherlink Testnet (e.g., for gas fees and debate creation/staking).

*   **Etherlink Faucet:** Visit [faucet.etherlink.com](https://faucet.etherlink.com) to request free testnet XTZ. You can typically request a small amount every 24 hours.
*   **Bridging from Tezos Layer 1 (for larger amounts):**
    1.  Acquire testnet XTZ on the Tezos Ghostnet (Layer 1) using a Tezos-compatible wallet (e.g., Temple Wallet) and a Tezos Ghostnet faucet.
    2.  Use the Etherlink Bridge: [https://testnet.bridge.etherlink.com/tezos](https://testnet.bridge.etherlink.com/tezos) to transfer XTZ from Tezos L1 to Etherlink L2.

**Note on Wallet Balance:** The balance displayed in the application reflects your XTZ balance on the **Etherlink Testnet (Layer 2)**. If you have XTZ on Tezos Layer 1, you must bridge it to Etherlink Layer 2 for it to appear in the app.

### 2. Project Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd oneste-ui
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### 3. Configuration

1.  **Create `.env` file:**
    *   Create a file named `.env` in the root of your project.
    *   Copy the contents from `.env.example` into your new `.env` file.
2.  **Update Environment Variables:**
    *   `NEXT_PUBLIC_CONTRACT_ADDRESS`: Set this to the deployed address of your `OnesteVoting` smart contract on the Etherlink Testnet.
    *   `NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY`: Obtain this from the Sequence developer console and set it here.

### 4. Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Building for Production

```bash
npm run build
```

This will create an optimized production build of your application.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
