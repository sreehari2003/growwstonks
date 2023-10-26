import { ENV, apiHandler } from "@app/config";
import { useQuery } from "@tanstack/react-query";

interface Response {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

const getAllDailyStocks = async (cmp: string) => {
  const endPoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${cmp}&apikey=${ENV.api_token}`;
  const { data } = await apiHandler.get(endPoint);
  if (data["Information"]) {
    throw new Error();
  }
  return data["Time Series (Daily)"] as Response;
};

export const useIntraDay = (name: string) => {
  const events = useQuery<Response>({
    queryKey: ["intraday"],
    queryFn: () => getAllDailyStocks(name),
  });
  return events;
};
