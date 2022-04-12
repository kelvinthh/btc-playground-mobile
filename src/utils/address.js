import * as bip39 from "bip39";
import * as hdkey from "hdkey";
import * as bitcoin from "bitcoinjs-lib";

export function getSegwit(mnemonic, seed, path) {
  console.log("Mnemonic", mnemonic);
  console.log("Seed", seed);
  console.log("Path", path);

  try {
    if (mnemonic === "" && seed === "") return { valid: false, errMsg: "Both menmonic words and seed are empty." };
    if (mnemonic != "" && seed !== "") return { valid: false, errMsg: "Both menmonic words and seed are not empty." };

    let buffer = "";

    if (seed != "") {
      const re = /[0-9A-Fa-f]{6}/g;
      if(!re.test(seed)) return { valid: false, errMsg: "Invalid seed hex string." };
      buffer = seed;
    } else if (mnemonic != "") {
      // Check if the provided mnemonic words is valid
      if (!bip39.validateMnemonic(mnemonic)) return { valid: false, errMsg: "Invalid mnemonic words." };
      buffer = bip39.mnemonicToSeedSync(mnemonic).toString("hex");
    }
    console.log("Received words", mnemonic);
    console.log("Calculated seed", buffer);

    const root = hdkey.fromMasterSeed(buffer);
    // as defined by BIP-44
    const addrnode = root.derive(path);
    const publicKey = addrnode.publicKey;
    const address = bitcoin.payments.p2wpkh({ pubkey: publicKey }).address ?? "";
    console.log("Public key", publicKey.toString("hex"));
    return { valid: true, data: { seed: seed, address: address } };
  } catch (error) {
    return { valid: false, errMsg: String(error) };
  }
}

export function getMultiSig(mValue, publicKeys) {
  console.log("M Length", mValue, "Public keys length", publicKeys.length);
  let pubkeys = publicKeys.map((hex) => Buffer.from(hex, "hex"));
  const { address } = bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2ms({ m: +mValue, pubkeys }) });
  return address ?? "";
}
