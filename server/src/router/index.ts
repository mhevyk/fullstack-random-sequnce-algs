import express from "express";
// import algorithmStepsController from "../controllers/algorithm-steps.js";
import randomController from "../controllers/random.js";
import {
  validateCount,
  validateHex,
  validateLimit,
} from "../validators/query/index.js";

const router = express.Router();

// router.get("/steps/:algorithm", algorithmStepsController.getSteps);

router.get(
  "/random/fips186",
  validateCount,
  validateLimit,
  randomController.getFips186Random
);

router.get(
  "/random/ansix917",
  validateCount,
  validateLimit,
  validateHex("seed"),
  validateHex("key"),
  randomController.getAnsix917Random
);

export default router;
