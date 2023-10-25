import bigInt from "big-integer";
import CryptoJS from "crypto-js";

const encrypt = CryptoJS.TripleDES.encrypt;
const hex = CryptoJS.format.Hex;

export function ansix917(
  s0: string,
  key: string,
  generatedWordsCount: number,
  limit: number
) {
  const Temp = encrypt(getCurrentTimestampWord(), key).toString(hex);
  let s = s0.toUpperCase();

  const sequence: bigInt.BigInteger[] = [];
  for (let i = 0; i < generatedWordsCount; i++) {
    const xi = encrypt(xor(s, Temp), key).toString(hex);
    const xiBigInt = bigInt(xi, 16).mod(limit);
    sequence.push(xiBigInt);

    s = encrypt(xor(xi, Temp), key).toString(hex);
  }
  return sequence.map(Number);
}

function getCurrentTimestampWord() {
  const timestamp = new Date().getTime();
  const timestampBuffer = Buffer.alloc(8);
  timestampBuffer.writeBigInt64BE(BigInt(timestamp));
  return timestampBuffer.toString("hex");
}

// xor hex strings
function xor(hex1: string, hex2: string) {
  // Remove dashes from input strings
  hex1 = hex1.replace(/-/g, "");
  hex2 = hex2.replace(/-/g, "");

  // Convert hexadecimal strings to decimal numbers
  const decimalNumber1 = parseInt(hex1, 16);
  const decimalNumber2 = parseInt(hex2, 16);

  // Perform the XOR operation on decimal numbers
  const resultXORDecimal = decimalNumber1 ^ decimalNumber2;
  const resultHex = resultXORDecimal
    .toString(16)
    .toUpperCase()
    .padStart(16, "0");

  return resultHex;
}

// const Temp = hashWith3DES(timestampBuffer, key);
// let s = Buffer.from(s0, 16);

// for (let i = 0; i < generatedWordsCount; i++) {
//   const xi = hashWith3DES(xorBuffers(s, Temp), key);
//   sequence.push(bufferToBigInt(xi).mod(limit));
//   s = hashWith3DES(xorBuffers(xi, Temp), key);
// }

// function xorBuffers(buffer1, buffer2) {
//   const length = Math.max(buffer1.length, buffer2.length);
//   const result = Buffer.alloc(length);

//   for (let i = 0; i < length; i++) {
//     const byte1 = i < buffer1.length ? buffer1[i] : 0;
//     const byte2 = i < buffer2.length ? buffer2[i] : 0;
//     result[i] = byte1 ^ byte2;
//   }

//   return result;
// }

// function bufferToBigInt(buffer) {
//   return bigInt(buffer.toString("hex"), 16);
// }

// export function hashWith3DES(text, key) {
//   const algorithm = "des-ede3";
//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), "");

//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);

//   const hex = encrypted.toString("hex");

//   return Buffer.from(hex, "hex");
// }
