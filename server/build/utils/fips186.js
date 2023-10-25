import bigInt from "big-integer";
import crypto from "crypto";
import { Random } from "./random.js";
export function fips186(generatedWordsCount, limit) {
    const b = Random.Int({ min: 160, max: 512 });
    let s = Random.BigInt({ bits: b });
    const t = bigInt("67452301efcdab8998badcfe10325476c3d2e1f0", 16);
    const sequence = [];
    for (let i = 0; i < generatedWordsCount; i++) {
        const coin = Random.Bit();
        const yi = coin === 1 ? Random.BigInt({ bits: b }) : 0;
        const zi = s.add(yi).mod(2 ** b);
        const xi = G(t, zi).mod(limit);
        sequence.push(xi);
        s = s
            .add(1)
            .add(xi)
            .mod(2 ** b);
    }
    return sequence.map(Number);
}
function G(t, c) {
    const tBuffer = Buffer.from(t.toString(16), "hex");
    const cBuffer = Buffer.from(c.toString(16), "hex");
    const zeroPadLength = 512 / 8 - cBuffer.length;
    const zeroPaddedCBuffer = Buffer.concat([
        cBuffer,
        Buffer.alloc(zeroPadLength),
    ]);
    const cWords = [];
    for (let i = 0; i < 16; i++) {
        const word = zeroPaddedCBuffer.readUInt32BE(i * 4);
        cWords.push(word);
    }
    const sha1Hash = sha1(Buffer.concat([tBuffer, zeroPaddedCBuffer]));
    const hWords = [];
    for (let i = 0; i < 5; i++) {
        const word = sha1Hash.readUInt32BE(i * 4);
        hWords.push(word);
    }
    return bigInt(hWords.join(""));
}
function sha1(value) {
    return crypto.createHash("sha1").update(value).digest();
}
//# sourceMappingURL=fips186.js.map