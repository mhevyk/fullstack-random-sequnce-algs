import express from "express";
import randomController from "../controllers/random.js";
import {
  ansix917ValidationRules,
  bbsValidationRules,
  bigIntValidationRules,
  fips186ValidationRules,
} from "../validation/index.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.get(
  "/random/fips186",
  fips186ValidationRules,
  validate,
  randomController.getFips186Random
);

router.get(
  "/random/ansix917",
  ansix917ValidationRules,
  validate,
  randomController.getAnsix917Random
);

router.get(
  "/random/bbs",
  bbsValidationRules,
  validate,
  randomController.getBBSRandom
);

router.get(
  "/random/bigint",
  bigIntValidationRules,
  validate,
  randomController.getRandomBigInt
);

export default router;
