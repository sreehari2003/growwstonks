import { useDailyStock } from "@app/hooks/api";
import { Card } from "@app/components/Card";

export const Gainers = () => {
  //   const { isLoading } = useDailyStock();
  return (
    <div className="flex gap-6 flex-wrap mt-5">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};
