import { Button, Form } from "react-bootstrap";
import { GetBBSResponse } from "../../api/types";
import {
  Feedback,
  FormTextGroup,
  MathText,
  Section,
  StatisticTests,
} from "../../components";
import { useRandomSequenceQuery } from "../../hooks/useRandomSequenceQuery";
import { useState } from "react";
import { renderBitList } from "../../utils/renderBitList";

export function BBS() {
  const [count, setCount] = useState("1");

  const params = new URLSearchParams({
    count,
  });

  const randomSequenceQuery = useRandomSequenceQuery<GetBBSResponse>(
    "bbs",
    params
  );
  return (
    <>
      <Section title="BBS (Blum-Blum-Shub)">
        <Form className="inner-gap-md">
          <FormTextGroup
            label={
              <>
                Кількість згенерованих чисел <MathText>m</MathText>
              </>
            }
          >
            <Form.Control
              type="number"
              placeholder="Введіть кількість згенерованих чисел..."
              value={count}
              onChange={e => setCount(e.target.value)}
            />
          </FormTextGroup>
          <Button onClick={() => randomSequenceQuery.refetch()}>
            Згенерувати послідовність
          </Button>
          <Feedback on={randomSequenceQuery} renderData={renderBitList} />
        </Form>
      </Section>
      {randomSequenceQuery.data && (
        <StatisticTests
          isLoading={randomSequenceQuery.isFetching}
          sequence={randomSequenceQuery.data?.data}
        />
      )}
    </>
  );
}
