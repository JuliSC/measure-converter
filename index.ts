import express, {Express, Request, Response} from "express";
import {CurrencyConverter} from "./classes/CurrencyConverter";
import {GradeConverter} from "./classes/GradeConverter";
const dotenv = require("dotenv");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
  res.send("Unit converter application for KEA - SD22 - Testing Course ");
  const currencyConverter = new CurrencyConverter(1, "DKK");
  const convertedCurrencies = await currencyConverter.convert();
  // console.log(convertedCurrencies);

  // const gradeConverter = new GradeConverter("12", "DK");
  // gradeConverter.convert();
});

app.listen(port, () => {
  console.log(`[server]: Server is running on https://localhost:${port}`);
});
