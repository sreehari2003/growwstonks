import { apiHandler } from "@app/config";
import { useQuery } from "@tanstack/react-query";

const getAllStocks = async () => {
  const { data } = await apiHandler.get("/user");
  return data;
};

export const useDailyStock = () => {
  const events = useQuery({ queryKey: ["all-stock"], queryFn: getAllStocks });
  return events;
};
