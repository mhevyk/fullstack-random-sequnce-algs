import CryptoJS from "crypto-js";

export function encryptWith3DES(value: string, key: string) {
  const hash = CryptoJS.TripleDES.encrypt(value, key);
  return hash.toString(CryptoJS.format.Hex);
}

export function encryptWithSHA1(value: string) {
  const hash = CryptoJS.SHA1(value);
  return hash.toString(CryptoJS.enc.Hex);
}
