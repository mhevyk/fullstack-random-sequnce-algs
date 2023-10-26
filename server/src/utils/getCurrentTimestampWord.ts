export function getCurrentTimestampWord() {
  const timestamp = new Date().getTime();
  const timestampBuffer = Buffer.alloc(8);
  timestampBuffer.writeBigInt64BE(BigInt(timestamp));
  return timestampBuffer.toString("hex");
}
