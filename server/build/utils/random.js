import crypto from "crypto";
import bigInt from "big-integer";
export class Random {
    static Int({ min, max }) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static Bit() {
        return Random.Int({ min: 0, max: 1 });
    }
    static Hex({ bits }) {
        const bytes = Math.floor(bits / 8);
        const buffer = crypto.randomBytes(bytes);
        return buffer.toString("hex");
    }
    static BigInt({ bits }) {
        return bigInt(Random.Hex({ bits }), 16);
    }
}
//# sourceMappingURL=random.js.map