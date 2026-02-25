const bip39 = require('bip39');
const{ BIP32Factory } = require("bip32");
const tinysecp = require("tiny-secp256k1");
const bip32 = BIP32Factory(tinysecp);
const secp256k1 = require("secp256k1");
const { keccak256 } = require("ethereumjs-util");
const crypto = require('crypto');

//const generateMnemonic = () => {
    //return bip39.generateMnemonic(256); 
//};

const entropy = crypto.randomBytes(32);
const mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'));
console.log("Mnemonic Phrase\n" + mnemonic);

const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = bip32.fromSeed(seed);

const derivePath = "m/44'/60'/0'/0/0";
const childNode = root.derivePath(derivePath);const ADDRESS__COUNT =10;


for (let i = 0; i < ADDRESS__COUNT; i++) {
    const path = "m/44'/60'/0'/0/${i}";
    const child = root.derivePath(path);


    const privateKey = child.privateKey;


    const publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1);
    const address = keccak256(publicKey).slice(-20).toString('hex');
    console.log("Address " + i + ": 0x" + address);
    console.log("Private Key " + i + ": " + privateKey.toString('hex'));
}