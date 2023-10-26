import bigInt from "big-integer";

function isPrime(number: bigInt.BigInteger) {
  if (number.compare(1) <= 0) return false;
  if (number.compare(3) <= 0) return true;
  if (number.isDivisibleBy(2) || number.isDivisibleBy(3)) return false;

  const sqrtNum = number.pow(bigInt(1).divide(2));

  for (let i = bigInt(5); i.compare(sqrtNum) <= 0; i = i.add(6)) {
    if (number.isDivisibleBy(i) || number.isDivisibleBy(i.add(2))) return false;
  }

  return true;
}

export function findClosestPrime(number: bigInt.BigInteger) {
  if (number.compare(2) <= 0) return bigInt(2);
  if (isPrime(number)) return number;

  let lower = number.subtract(1);
  let upper = number.add(1);

  while (true) {
    if (isPrime(lower)) return lower;
    if (isPrime(upper)) return upper;
    lower = lower.subtract(1);
    upper = upper.add(1);
  }
}
