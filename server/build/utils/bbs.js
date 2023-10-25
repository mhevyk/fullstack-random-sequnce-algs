import bigInt from "big-integer";
import { Random } from "./random.js";
function toRemainder({ value, remainder, divisor }) {
    const bigIntRemainder = bigInt(remainder);
    const r = value.mod(divisor);
    if (r.equals(bigIntRemainder)) {
        return value;
    }
    else {
        return value.add(bigIntRemainder.subtract(r));
    }
}
export function bbs() {
    const p = toRemainder({
        value: Random.BigInt({ bits: 1024 }),
        remainder: 3,
        divisor: 4,
    });
    const q = toRemainder({
        value: Random.BigInt({ bits: 1024 }),
        remainder: 3,
        divisor: 4,
    });
    const N = p.times(q);
    console.log(N);
}
console.log(bbs());
//# sourceMappingURL=bbs.js.map