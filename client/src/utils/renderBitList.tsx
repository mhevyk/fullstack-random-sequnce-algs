import { Bit } from "../types";

type Arguments = {
  data: Bit[];
  count: number;
};

export function renderBitList({ data, count }: Arguments) {
  return (
    <>
      Згенерована наступна послідовність з {count} бітів:{" "}
      <div className="d-flex overflow-x-auto gap-1 mb-2 py-3">
        {data.map((bit, index) => (
          <div key={index} className={`bit ${bit === 1 ? "bit-1" : "bit-0"}`}>
            {bit}
          </div>
        ))}
      </div>
    </>
  );
}
