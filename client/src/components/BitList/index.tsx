import { memo } from "react";

type BitListItemProps = {
  bit: number;
};

const BitListItem = memo(({ bit }: BitListItemProps) => {
  return <div className={`bit bit_${bit}`}>{bit}</div>;
});

type BitListProps = {
  data: number[];
};

export const BitList = memo(({ data }: BitListProps) => {
  return (
    <>
      Згенерована наступна послідовність з {data.length} елементів:{" "}
      <div className="d-flex overflow-x-auto gap-1 mb-2 py-3">
        {data.map((bit, index) => (
          <BitListItem key={index} bit={bit} />
        ))}
      </div>
    </>
  );
});
