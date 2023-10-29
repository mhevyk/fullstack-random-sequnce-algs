import { queryBigIntWithXBitsRule } from "./rules/queryBigIntWithXBitsRule.js";
import { queryBitsMod8 } from "./rules/queryBitsMod8Rule.js";
import { queryRangeRule } from "./rules/queryRangeRule.js";

export const fips186ValidationRules = [
  queryRangeRule("count", { min: 1, max: 50000 }),
  queryBigIntWithXBitsRule("limit", {
    bits: 160,
    default: "1391605785169562015414196052258036110133116476015",
  }),
];

export const ansix917ValidationRules = [
  queryRangeRule("count", { min: 1, max: 50000 }),
  queryBigIntWithXBitsRule("seed", {
    bits: 64,
    default: "12712645049748658104",
  }),
  queryBigIntWithXBitsRule("key", {
    bits: 128,
    default: "253019564733276754055855694968778029229",
  }),
];

export const bbsValidationRules = [
  queryRangeRule("count", { min: 1, max: 50000 }),
];
export const bigIntValidationRules = [queryBitsMod8("bits")];
