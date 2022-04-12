import * as crypto from "crypto";
import * as bip39 from "bip39";

export function generateMnemonic(wordCount) {
  // Word count can be any of 12, 15, 18, 21, 24
  let randomBytes = getRandomBytes(wordCount);
  let mnemonic = bip39.entropyToMnemonic(randomBytes);
  if (bip39.validateMnemonic(mnemonic)) {
    console.log("Valid bip39 Mnemonic, Length:", mnemonic.split(" ").length);
    return mnemonic;
  } else {
    console.log(mnemonic);
    return "ERROR, fail to validate the mnemonic words with bip39 standard.";
  }
}

function getRandomBytes(wordCount) {
  // Can be any of 12, 15, 18, 21, 24
  let fullEntropy = wordCount * 11; // 11 being the max bit count
  let checksum = fullEntropy % 32; // Checksum = entropy length divided by 32
  let initEntropy = fullEntropy - checksum;
  let byteCount = initEntropy / 8;

  // Return 40 length hexa-decimal characters
  let randomBytes = crypto.randomBytes(byteCount).toString("hex");
  console.log("Random bytes is", randomBytes);
  return randomBytes;
}
