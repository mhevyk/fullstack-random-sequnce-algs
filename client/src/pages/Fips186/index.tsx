import { Button, Form } from "react-bootstrap";
import {
  Feedback,
  FormTextGroup,
  StatisticTests,
  Section,
  RandomBigIntegerInput,
} from "../../components";
import { useRandomSequenceQuery } from "../../hooks/useRandomSequenceQuery";
import { useState } from "react";
import { renderBitList } from "../../utils/renderBitList";
import { GetFips186RandomResponse } from "../../api/types";

export function Fips186() {
  const [count, setCount] = useState("1");
  const [limit, setLimit] = useState(
    "1373051830727328531293517081251341408442730140535"
  );

  const params = new URLSearchParams({
    count,
    limit,
  });

  const randomSequenceQuery = useRandomSequenceQuery<GetFips186RandomResponse>(
    "fips186",
    params
  );

  return (
    <>
      <Section title="Генерація псевдовипадкової послідовності">
        <Form className="inner-gap-md">
          <FormTextGroup label="Кількість згенерованих чисел (m)">
            <Form.Control
              type="number"
              placeholder="Введіть параметр m..."
              value={count}
              onChange={e => setCount(e.target.value)}
            />
          </FormTextGroup>
          <FormTextGroup label="Сіль (q)">
            <RandomBigIntegerInput
              bits={160}
              placeholder="Введіть параметр q..."
              value={limit}
              setValue={setLimit}
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
