import { useQuery } from "react-query";
import { getRandomBigInt } from "../../../api";

export function useRandomBigIntQuery(bits: number) {
  return useQuery({
    queryKey: "random-big-int",
    queryFn: () => getRandomBigInt(bits),
    refetchOnWindowFocus: false,
  });
}
