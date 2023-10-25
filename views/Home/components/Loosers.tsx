import { Card } from "@app/components/Card";
import { useDailyStock } from "@app/hooks/api";
import { LimitError } from "./LimitError";
import { Loader } from "@app/components/Loader";

export const Loosers = () => {
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
    <div className="flex gap-6 flex-wrap mt-5">
      <div className="flex gap-6 flex-wrap mt-5">
        {data?.top_loosers.map((el) => (
          <Card
            key={el.ticker}
            name={el.ticker}
            change={el.change_percentage}
            price={el.price}
          />
        ))}
      </div>
    </div>
  );
};
