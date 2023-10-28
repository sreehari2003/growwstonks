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

const getStockHistory = async (cmp: string) => {
  const endPoint = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${cmp}&apikey=${ENV.api_token}`;
  const { data } = await apiHandler.get(endPoint);
  if (data["Information"]) {
    throw new Error();
  }
  return data["Weekly Adjusted Time Series"];
};

export const useStockHistory = (name: string) => {
  const events = useQuery<Response>({
    queryKey: ["intraday"],
    queryFn: () => getStockHistory(name),
  });
  return events;
};
