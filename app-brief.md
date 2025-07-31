🧑‍💻 1. Debate Creation (Creator Flow)
Who: Any user
Action: createDebate(debateId, proposalIds, minVoteAmount)
Requirements:

Sends PLATFORM_FEE + optional reward in msg.value

Specifies unique, non-zero proposalIds

Optionally sets a minimum vote amount (can be zero)

What Happens:

Deducts platform fee

Initializes a new debate with proposal options

Starts voting period (7 days)

Emits DebateCreated event

🪙 2. Staking (Optional for Users)
Who: Any user
Action: stake()
Requirements:

Sends at least MIN_STAKE (e.g., 1 ether)

What Happens:

Amount added to user stake balance (can later be used to vote)

🗳️ 3. Voting (User Flow)
Who: Any user
Action: vote(debateId, proposalId, stakeAmount)
Requirements:

Debate must be active and not ended

User must not have voted on this debate already

Proposal must be valid

StakeAmount must be ≥ debate’s minVoteAmount

User must have enough balance or send ETH in msg.value

What Happens:

stakeAmount deducted from balance or msg.value

stakeAmount added to rewardPool

vote is recorded for user

voter added to debate’s voter list

emits Voted event

🏆 4. Reward Distribution (Auto Triggered)
Who:

Creator within 7 days after voting ends, OR

Anyone after CREATOR_GRACE_PERIOD (e.g., 2 days after end)

Action: distributeRewards(debateId)

What Happens:

Determines winning proposal by majority

Distributes reward pool equally among winning voters

Emits RewardDistributed for each winner

Marks debate as ended

💰 5. Withdraw Stake (User Flow)
Who: Any user
Action: withdraw()

What Happens:

Transfers entire staked balance back to user

Emits StakeWithdrawn event

🔍 6. Read/Query Functions
getVoters(debateId) → Returns voter addresses

getWinningProposal(debateId) → Returns current winner (post-debate)

hasClaimedReward(debateId, voter) → Check if voter claimed reward (used internally)

🧠 Smart Design Touches
Users can vote for free (if minVoteAmount = 0)

Voting is stake-weighted but not required

Only winning voters get rewards

Reward pool grows with more stake/votes

Automatic distribution but optimized for gas