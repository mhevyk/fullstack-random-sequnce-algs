import bigInt from "big-integer";

type ToRemainderArguments = {
  value: bigInt.BigInteger;
  remainder: number;
  divisor: number;
};

export function toRemainder({
  value,
  remainder,
  divisor,
}: ToRemainderArguments) {
  const bigIntRemainder = bigInt(remainder);
  const r = value.mod(divisor);
  if (r.equals(bigIntRemainder)) {
    return value;
  } else {
    return value.add(bigIntRemainder.subtract(r));
  }
}
