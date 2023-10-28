import { apiHandler } from "@app/config";
import { useQuery } from "@tanstack/react-query";
import { TOP_GAINERS_AND_LOSERS } from "@app/config/endpoints";
import { stock } from "@app/data/stock";

type Data = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};

interface Response {
  metadata: string;
  last_updated: string;
  top_gainers: Data[];
  top_losers: Data[];
  most_actively_traded: Data[];
}

const getAllStocks = async () => {
  const { data } = await apiHandler.get(TOP_GAINERS_AND_LOSERS);
  if (data["Information"]) {
    throw new Error();
  }
  return data;
  // return stock;
};

export const useDailyStock = () => {
  const events = useQuery<Response>({
    queryKey: ["all-stock"],
    queryFn: getAllStocks,
  });
  return events;
};
