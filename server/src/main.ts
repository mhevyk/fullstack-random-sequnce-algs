import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import handleException from "./middlewares/exception-middleware.js";
import router from "./router/index.js";

const app: Application = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use("/api", router);
app.use(handleException);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
