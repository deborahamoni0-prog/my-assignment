# Etherscan explorer & Transactin Hash
### Etherscan Explorer
On the etherscan explorer i observed;
* The current price of ehtherum which is at $2,983.13
* the total number of gas 0.124gwei
* then a table which contains;
1.**Tansaction hash**  which contains a unique ID or a receipt number . On clicking it , you can see who sent the ETH ,who receieved it ,,how much was sent, whether it succeded or not, the gas fee e.t.c. each transaction hash differs from each other ,they are not the same
2.**A block** It is like a ledger page. It keeps record of all the transactions made inside. It contains informations such as; the height, transactions , status(finalized or unfinalized), withdrawals, fee recipient(which is the validator who has proposed the block),block reward , size, gas used, gas limit e.t.c.
3.**Method**  This is the method of transmiting etherum,whether it is ; transfer, swap,e.t.c.
each method transaction harsh differs;
for example if we have a method of swap ; the transaction hash shows other internal transactions , it also shows the ERC-20 token transferred
then for 
4.**Age** This is how long the transactins were made.
5.**From & To**; this shows the senders address and the receipients adress respectively.
6**Amount & Transaction fee**.this shows the amount of ETH sent or received and a transactin fee cost.

**SUMMARY**
An etherscan explorer  is like a public ledger browser or detective tool: it lets you explore Ethereum, see who sent what to whom, and track every transaction safely. it adds transactins every 12secs.

## Tansaction Hash
Transaction Hash is a unique ID that lets anyone find & verify a crypto transaction on a block chain. It is like a receipt no from which we can see who sent the ETH, who received it ,how much was sent , gas fee used to enter the treansaction ,whether it succeded or not e.t.c.
The transaction hash in the transaction we made contains;
1. The unique ID or receipt number which is the transaction hash
2. Status; to show whether the transaction made succeeded or failed. In our own case now the transaction succeeded
3. Block; here transactions are recorded inside and may trigger smart contract
4. Timestamp; the date the the transaction was made and recorded
5. From & To; this contains the senders address and the receivers adress respectively.
6. Value; the amount of ETH transacted (i.e received or sent). in our case , 0.00005ETH was sent .
7. Gas fee; this is the amount paid to process tranasctions or the money paid to use etherum road . Higher gas fee shows that the road is crowded, while lower gas fee shows that the road is empty. in the case of our own transactions the gas fee was higher than the amount sent , this is because it is a testnet 
**summary**
A transaction hash (also called Tx Hash) is a unique identifier for a specific transaction on Ethereum.
It’s like a tracking number for a package.
Every transaction gets its own unique hash.
You can use it to look up your transaction on Etherscan.
When you enter a hash on Etherscan, you can see:
From & To: Who sent and who received ETH.
Amount: How much ETH or token was transferred.
Gas Fee: How much you paid to execute the transaction.
Block: Which block included the transaction.
 Status: Success, Failed, or Pending.
Timestamp: When it happened.

# conclusion
Etherscan is the tool, transaction hash is the key. You need the hash to find a specific transaction, and Etherscan lets you explore the blockchain using that hash.