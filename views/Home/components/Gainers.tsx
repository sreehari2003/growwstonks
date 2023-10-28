import { useDailyStock } from "@app/hooks/api";
import { Card } from "@app/components/Card";
import { LimitError } from "./LimitError";
import { Loader } from "@app/components/Loader";

export const Gainers = () => {
  const { isLoading, data, error } = useDailyStock();

  if (isLoading) {
    return (
      <div className="flex gap-6 mt-5 flex-wrap">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <LimitError />;
  }

  return (
    <div className="flex gap-6 flex-col mt-5 md:flex-wrap md:flex-row">
      {data?.top_gainers.map((el) => (
        <Card
          key={el.ticker}
          name={el.ticker}
          change={el.change_percentage}
          price={el.price}
        />
      ))}
    </div>
  );
};
