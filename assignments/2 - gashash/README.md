Gas fee: these are set and collected by  the block chains that decentralzed exchanges , NFT , markertplaces and other apps rely on to run properly (like how payment networks collect fees on credit and transactions.) 

Gas limit: Gas limit is the maximum amount of computational work (gas) that a blockchain transaction is allowed to use.
In simple terms

Every action on a blockchain (sending tokens, interacting with a smart contract) costs gas.
Gas limit sets the maximum gas you’re willing to spend.
If the transaction needs more gas than the limit, it fails.
If it uses less gas, the unused gas is refunded.
Why gas limit exists

Prevents infinite loops
Smart contracts could run endlessly without a limit.
Protects users from overspending
You control the maximum cost of execution.
Helps the network stay efficient
Miners/validators know how much work a transaction may require.
Formula to calculate Gas fee

 Gas Fee = Gas Limit × Gas Price
Gas price = base fee + priority fee
Total Gas Fee = Gas Limit × (Base Fee + Priority Fee) 
"Where actual fee ≤ Max Fee Per Gas"

# Variables That Influence Gas: 


Gas Limit - Maximum computation units you authorize (determined by transaction complexity).
Base Fee - Network-set minimum fee that gets burned (adjusts ±12.5% per block based on congestion).
Priority Fee (Tip) - Extra payment to validators for faster inclusion
Network Congestion - More demand = higher base fee.
Transaction Type- Simple transfers (21k gas) vs complex smart contracts (100k+ gas).
Storage Operations - Writing to blockchain storage is expensive (20k gas per SSTORE).
Calldata Size - More data = more gas (16 gas per non-zero byte).
Block Fullness - EIP-1559 targets 50% full; deviations adjust base fee.
Time of Day - Network usage patterns affect congestion.
ETH Price - Affects USD cost but not gas amount.

Base fee: Base fee is the minimum gas fee required by the Ethereum network for your transaction to be included in a block.

In simple terms
Base fee is set by the network, not by users.
Every transaction must pay it.
It is burned (destroyed), no one receives it.
It changes automatically based on network congestion.

How base fee works
If blocks are more than 50% full → base fee increases
If blocks are less than 50% full → base fee decreases
Adjustment happens every block

If block > 50% full → Base fee increases (up to 12.5%)
If block < 50% full → Base fee decreases (up to 12.5%)

Why base fee is important
Reduces fee guessing
Prevents sudden fee spikes
Makes ETH deflationary (ETH is burned)
Improves user experience

Gas price (Gwei): Gas price (Gwei) is the amount you pay for each unit of gas when making a blockchain transaction.
What is Gwei?
Gwei = Giga-Wei
It’s a small unit of ETH
Conversion:
1 ETH = 1,000,000,000 Gwei
1 Gwei = 0.000000001 ETH