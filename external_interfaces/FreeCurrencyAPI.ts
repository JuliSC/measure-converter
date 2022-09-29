import axios, {AxiosResponse} from "axios";
const dotenv = require("dotenv");
dotenv.config();

async function getExchangeRates(base_currency: string) {
  const res: AxiosResponse = await axios(
    "https://api.currencyapi.com/v3/latest",
    {
      headers: {
        apikey: process.env.CURRENCY_API_KEY as string,
      },
      params: {
        base_currency,
      },
    }
  );

  console.log(res.data.data);

  return res.data.data;
}

export default {getExchangeRates};
