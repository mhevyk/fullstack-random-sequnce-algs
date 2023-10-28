import { Button, Form } from "react-bootstrap";
import { GetAnsix917Response } from "../../api/types";
import {
  Feedback,
  FormTextGroup,
  MathText,
  RandomBigIntegerInput,
  Section,
  StatisticTests,
} from "../../components";
import { useRandomSequenceQuery } from "../../hooks/useRandomSequenceQuery";
import { renderBitList } from "../../utils/renderBitList";
import { useState } from "react";

export function Ansix917() {
  const [seed, setSeed] = useState("");
  const [key, setKey] = useState("");
  const [count, setCount] = useState("1");

  const params = new URLSearchParams({
    count,
    key,
    seed,
  });

  const randomSequenceQuery = useRandomSequenceQuery<GetAnsix917Response>(
    "ansix917",
    params
  );

  return (
    <>
      <Section title="ANSI X9.17">
        <Form className="inner-gap-md">
          <FormTextGroup
            label={
              <>
                Випадкове (і секретне) 64-бітове початкове значення{" "}
                <MathText>s_0</MathText>
              </>
            }
          >
            <RandomBigIntegerInput
              bits={64}
              type="number"
              placeholder="Введіть секретне 64-бітове початкове значення..."
              value={seed}
              setValue={setSeed}
            />
          </FormTextGroup>
          <FormTextGroup
            label={
              <>
                128-бітний складовий ключ <MathText>K</MathText>
              </>
            }
          >
            <RandomBigIntegerInput
              bits={128}
              type="number"
              placeholder="Введіть 128-бітний складовий ключ..."
              value={key}
              setValue={setKey}
            />
          </FormTextGroup>
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
