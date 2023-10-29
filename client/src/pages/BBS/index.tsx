import { Button, Form } from "react-bootstrap";
import { GetBBSResponse } from "../../api/types";
import {
  Feedback,
  FormTextGroup,
  MathText,
  Section,
  StatisticTests,
  BitList,
} from "../../components";
import { useRandomSequenceQuery } from "../../hooks/useRandomSequenceQuery";
import { useState } from "react";

export function BBS() {
  const [count, setCount] = useState("1");

  const params = new URLSearchParams({
    count,
  });

  const randomSequenceQuery = useRandomSequenceQuery<GetBBSResponse>(
    "bbs",
    params
  );

  const sequence = randomSequenceQuery.data?.data || [];

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
          <Feedback
            on={randomSequenceQuery}
            content={<BitList data={sequence} />}
          />
        </Form>
      </Section>
      {randomSequenceQuery.data && (
        <StatisticTests
          isLoading={randomSequenceQuery.isFetching}
          sequence={sequence}
        />
      )}
    </>
  );
}
