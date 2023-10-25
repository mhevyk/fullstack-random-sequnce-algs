export function ansix917(s0, key, generatedWordsCount, limit) {
}
function getCurrentTimestampWord() {
    const timestamp = new Date().getTime();
    const timestampBuffer = Buffer.alloc(8);
    timestampBuffer.writeBigInt64BE(BigInt(timestamp));
    return timestampBuffer.toString("hex");
}
function xor(hex1, hex2) {
    hex1 = hex1.replace(/-/g, "");
    hex2 = hex2.replace(/-/g, "");
    const decimalNumber1 = parseInt(hex1, 16);
    const decimalNumber2 = parseInt(hex2, 16);
    const resultXORDecimal = decimalNumber1 ^ decimalNumber2;
    const resultHex = resultXORDecimal
        .toString(16)
        .toUpperCase()
        .padStart(16, "0");
    return resultHex;
}
//# sourceMappingURL=ansi-x9.17.js.map