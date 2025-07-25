I’m developing a game called Oneste for the Etherlink hackathon, a Tezos layer-2 blockchain with EVM compatibility. Oneste features a voting system where players create debates (e.g., ‘Best new map: Forest vs. City?’) and fund a reward pool with Tezos (XTZ). The platform deducts a small fee (0.1 XTZ, ~$0.09) from the pool to sustain the game, leaving the rest for voter rewards. For example, a 5 XTZ pool becomes 4.9 XTZ after the fee, split among voters (e.g., 0.49 XTZ + 50 in-game points for 10 voters). Players stake XTZ (e.g., 1 XTZ, ~$0.89) to vote on debate options. A Solidity smart contract on Etherlink handles debate creation, fee deduction, staking, voting, and reward distribution, with low gas fees (~$0.0009–$0.009 per transaction). Players interact via wallets like MetaMask or Temple.

Please provide a detailed description of how you would build the user interface (UI) for this voting system. Include:

UI Components: Describe key screens/elements (e.g., debate creation form with pool input and fee display, staking input, voting buttons, reward dashboard).
Tech Stack: Recommend a frontend framework (e.g., React, Vue.js) and blockchain integration tools (e.g., Ethers.js, Taquito).
User Flow: Explain how players navigate from connecting their wallet to creating debates (funding the pool with fee deduction shown, e.g., ‘5 XTZ pool - 0.1 XTZ fee = 4.9 XTZ for voters’), staking XTZ, voting, and claiming rewards.
Design Considerations: Emphasize simplicity, mobile-friendliness, and clarity for non-technical players, with transparent fee display (e.g., ‘Platform Fee: 0.1 XTZ deducted from pool’).
Visual Style: Suggest a vibrant, debate-themed aesthetic (e.g., arena or podium visuals) suitable for a hackathon demo.
Error Handling: Describe handling errors like insufficient XTZ for the pool, invalid debate settings, or failed transactions.
Testing: Suggest testing the UI on Etherlink’s testnet with testnet XTZ for 5–10 demo players, with debates funded by 5–10 XTZ pools.
Keep the UI simple for a hackathon prototype, supporting 5–10 players. Assume the smart contract is deployed, with testnet XTZ funding debates and fees collected to a platform wallet.