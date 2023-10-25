import bigInt from "big-integer";
import crypto from "crypto";
import { Random } from "./random.js";

// limit: max number to generate not inclusive
export function fips186(generatedWordsCount: number, limit: number) {
  const b = Random.Int({ min: 160, max: 512 });
  let s = Random.BigInt({ bits: b });
  const t = bigInt("67452301efcdab8998badcfe10325476c3d2e1f0", 16);

  const sequence: bigInt.BigInteger[] = [];

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

  // оскільки числа збережені у форматі bitInt, то перетворимо їх у числа
  return sequence.map(Number);
}

function G(t: bigInt.BigInteger, c: bigInt.BigInteger) {
  // перетворимо t і c в байтовий масив
  const tBuffer = Buffer.from(t.toString(16), "hex");
  const cBuffer = Buffer.from(c.toString(16), "hex");

  // допишемо нулі до c так, щоб отримати 512-бітове слово
  const zeroPadLength = 512 / 8 - cBuffer.length;
  const zeroPaddedCBuffer = Buffer.concat([
    cBuffer,
    Buffer.alloc(zeroPadLength),
  ]);

  // розіб'ємо c на 16 32-бітних слів
  const cWords: number[] = [];
  for (let i = 0; i < 16; i++) {
    const word = zeroPaddedCBuffer.readUInt32BE(i * 4);
    cWords.push(word);
  }

  // Створюємо SHA-1 хеш з t і c
  const sha1Hash = sha1(Buffer.concat([tBuffer, zeroPaddedCBuffer]));

  // Розбиваємо SHA-1 хеш на 5 32-бітних слів
  const hWords: number[] = [];
  for (let i = 0; i < 5; i++) {
    const word = sha1Hash.readUInt32BE(i * 4);
    hWords.push(word);
  }

  // Повертаємо результат як об'єднання hWords
  return bigInt(hWords.join(""));
}

function sha1(value: crypto.BinaryLike) {
  return crypto.createHash("sha1").update(value).digest();
}

// console.log(fips186(5, 100));
