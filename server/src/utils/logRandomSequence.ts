import { Bit } from "../types";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function logRandomSequence(sequence: Bit[]) {
  let bitRow = "";
  for (const bit of sequence) {
    bitRow += bit;
  }

  bitRow += "\n";

  const logFilePath = resolve(__dirname, "..", "logs", "sequences.txt");

  fs.access(logFilePath, fs.constants.F_OK, err => {
    if (err) {
      fs.writeFile(logFilePath, bitRow, writeErr => {
        if (writeErr) {
          console.error(`Error creating the file: ${writeErr}`);
        }
      });
    } else {
      fs.appendFile(logFilePath, bitRow, appendErr => {
        if (appendErr) {
          console.error(`Error appending data: ${appendErr}`);
        }
      });
    }
  });
}
