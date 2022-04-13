# BitCoin Playground Mobile

This is mobile port of my [BitCoin Playground web app](https://github.com/kelvinthh/btc-playground).
![demo](https://i.imgur.com/jlXXopV.png)
### Features:
1. Generate mnemonic words of your choice of length (12-24).
2. Generate HD SegWit BitCoin wallet address with mnemonic words or hex string seed.
3. Generate N-Out-Of-M MultiSig BitCoin wallet address with specified m & n value and public keys.

All generated mnemonic words follow the [BIP39](https://iancoleman.io/bip39/) standard. And all Bitcoin address generated using this web app can be validated with online tools like [this](https://awebanalysis.com/en/bitcoin-address-validate/).

## How to run it

### Live version

A live web app version can be viewed here: [https://kelvinthh.github.io/btc-playground/](https://kelvinthh.github.io/btc-playground/)

### Or build on your own machine

To be added...

## Third-party libraries/packages in-use

* [BIP39](https://github.com/bitcoinjs/bip39)
* [hdkey](https://github.com/cryptocoinjs/hdkey)
* [BitcoinJS (bitcoinjs-lib)](https://github.com/bitcoinjs/bitcoinjs-lib)
* [rn-nodeify](https://github.com/tradle/rn-nodeify)
