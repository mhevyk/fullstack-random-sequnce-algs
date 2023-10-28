import { Button, Form } from "react-bootstrap";
import {
  Feedback,
  FormTextGroup,
  StatisticTests,
  Section,
  RandomBigIntegerInput,
  MathText,
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
