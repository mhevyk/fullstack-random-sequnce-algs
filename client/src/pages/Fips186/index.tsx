import { Button, Form } from "react-bootstrap";
import {
  Feedback,
  FormTextGroup,
  StatisticTests,
  Section,
  RandomBigIntegerInput,
  MathText,
  BitList,
} from "../../components";
import { useRandomSequenceQuery } from "../../hooks/useRandomSequenceQuery";
import { useState } from "react";
import { GetFips186RandomResponse } from "../../api/types";

export function Fips186() {
  const [count, setCount] = useState("1");
  const [limit, setLimit] = useState("");

  const params = new URLSearchParams({
    count,
    limit,
  });

  const randomSequenceQuery = useRandomSequenceQuery<GetFips186RandomResponse>(
    "fips186",
    params
  );

  const sequence = randomSequenceQuery.data?.data;

  return (
    <>
      <Section title="FIPS-186">
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
          <FormTextGroup
            label={
              <>
                160-бітове просте число <MathText>q</MathText>
              </>
            }
          >
            <RandomBigIntegerInput
              bits={160}
              placeholder="Введіть 160-бітове просте число..."
              value={limit}
              setValue={setLimit}
            />
          </FormTextGroup>
          <Button onClick={() => randomSequenceQuery.refetch()}>
            Згенерувати послідовність
          </Button>
          <Feedback
            on={randomSequenceQuery}
            content={<BitList data={sequence || []} />}
          />
        </Form>
      </Section>
      {sequence && !randomSequenceQuery.isError && (
        <StatisticTests
          isLoading={randomSequenceQuery.isFetching}
          sequence={sequence}
        />
      )}
    </>
  );
}
