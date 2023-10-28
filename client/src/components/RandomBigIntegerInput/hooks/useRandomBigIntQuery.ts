import { useQuery } from "react-query";
import { getRandomBigInt } from "../../../api";

export function useRandomBigIntQuery(bits: number, id: string) {
  return useQuery({
    queryKey: ["random-big-int", id],
    queryFn: () => getRandomBigInt(bits),
    refetchOnWindowFocus: false,
  });
}
