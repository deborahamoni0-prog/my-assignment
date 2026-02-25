const { calculateMerkleRoot, sha256, keccak256 } = require('./merkleRoot');

// Example transactions
const transactions = [
  'Alice sends 10 ETH to Bob',
  'Bob sends 5 ETH to Charlie',
  'Charlie sends 2 ETH to Alice'
];

console.log('Merkle Root Examples\n');

// SHA-256
const sha256Root = calculateMerkleRoot(transactions, 'sha256');
console.log('SHA-256 Root:', sha256Root);

// Keccak-256
const keccak256Root = calculateMerkleRoot(transactions, 'keccak256');
console.log('Keccak-256 Root:', keccak256Root);

// Single transaction
const singleRoot = calculateMerkleRoot(['Single TX'], 'sha256');
console.log('Single TX Root:', singleRoot);