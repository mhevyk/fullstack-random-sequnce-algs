import express from "express";
import randomController from "../controllers/random.js";
import { validateRandomCountParam } from "../middlewares/validate-random-count.js";
const router = express.Router();
console.log("ROUTER");
router.get("/random/fips186", validateRandomCountParam, randomController.getFips186Random);
export default router;
//# sourceMappingURL=index.js.map