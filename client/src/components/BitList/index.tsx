import { CSSProperties } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const SCROLLBAR_HEIGHT = 15;
const GAP_X = 4;
const GAP_Y = 16;
const ITEM_SIZE = 35;

type BitListItemProps = {
  index: number;
  style: CSSProperties;
  data: number[];
};

const BitListItem = ({ index, style, data }: BitListItemProps) => {
  const bit = data[index];

  return (
    <div
      style={{ ...style, width: ITEM_SIZE, height: ITEM_SIZE }}
      className={`bit bit_${bit}`}
    >
      {bit}
    </div>
  );
};

type BitListProps = {
  data: number[];
};

export const BitList = ({ data }: BitListProps) => {
  return (
    <>
      Згенерована наступна послідовність з {data.length} елементів:
      <div
        className="my-3"
        style={{ height: ITEM_SIZE + SCROLLBAR_HEIGHT + GAP_Y }}
      >
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              height={height}
              itemCount={data.length}
              itemData={data}
              itemSize={ITEM_SIZE + GAP_X}
              width={width}
              layout="horizontal"
            >
              {BitListItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </>
  );
};
