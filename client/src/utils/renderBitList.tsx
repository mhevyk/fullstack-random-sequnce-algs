import { memo } from "react";
import { Bit } from "../types";

type Arguments = {
  data: Bit[];
  count: number;
};

const BitListItem = memo(({ bit }: { bit: Bit }) => (
  <div className={`bit ${bit === 1 ? "bit-1" : "bit-0"}`}>{bit}</div>
));

const BitList = memo(({ data }: { data: Bit[] }) => (
  <div className="d-flex overflow-x-auto gap-1 mb-2 py-3">
    {data.map((bit, index) => (
      <BitListItem key={index} bit={bit} />
    ))}
  </div>
));

export function renderBitList({ data, count }: Arguments) {
  return (
    <>
      Згенерована наступна послідовність з {count} бітів:{" "}
      <BitList data={data} />
    </>
  );
}
