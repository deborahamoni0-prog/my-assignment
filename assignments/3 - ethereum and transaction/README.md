# ETHEREUM
* Ethereum is an open source ,globally decentralized computing infrastructure that executes programs called smart contracts .
* it uses a blockchain to synchronize and store the systems state changes , along with a cryptocurrency called ether to merer and constrain execution resource costs.
### Benefit
* it enables developers to build powerful decentalized applications with built-in economic functions 
* it provides high avalibility , aditability, transperency, and neutrality while reducing or eliminating censorship.
* it reduces certain counterparty risks.

Ethereum cryptographic primitives,such as;
* digtal signatures 
* hashes
* digital currency(ether).
###### components of a blockchain
* A p2p(peer-peer) network connecting participants and propagating transactions, based on standardize "gossip" protocol.
* Messages, in the form of transactions, representing state transactions .
* A set of consensus rules governing what constitutes a transaction & what makes for a valid state transaction.
* A chain of cryptographically secured blocks that acts as a journal of all the verified and accepted state transactions 
* state machine ; ethereum state transactions are processed by the ethereum virtual machine (EVM), a stacked-based virtual machine that executes bytecodes (machine-language instructions).
EVM programs are called smart contracts.
* data structures
* consesnsus alogrithm
* econmic security
* clients(such as go-ethereum(geth))& nethermind
# * TRANSACTIONS
Transactions are signed messeges originated by an externally owned account , transmitted by the ethereum blockchain.
They are the only things that can trigger a change of state , or cause a contract to execute in EVM.

 Everything starts with a transaction 
 
 A nonce is the most important components of a transaction.
 
 it is a scalar value equal to the number of transactins sent from this address or, in the case of accounts with associated code, the number of contracts -creations made by this account.
 it is an attribute of the originating address
*  legacy transactions ; is a serialized binary message that contains the following;
*  chain ID;the  chain ID of the network you're sending the transaction to.
*  Nonce; A sequence number, issued by the originating EOA and used to prevent message replay.
* gas price; the price of gas (in wei) that the originator is willing to pay
* gas limit; the maximum amount of gas originator is willing to buy for this transaction.
* receipient; the destination ethereum address
* value; the amount of ether to send to the destination
* Data; the variable-length binary data payload
* v,r,s; the three components of an ECDSA dital signature of originating EOA. 
