import { Card } from "@app/components/Card";
import { Skelton } from "@app/components/Skelton";
import { useDailyStock } from "@app/hooks/api";

export const StockNav = () => {
  const { data, isLoading, error } = useDailyStock();

  if (isLoading) {
    return (
      <div className="w-40 gap-6 flex-col  h-screen px-3 fixed hidden md:flex mt-3">
        <h5 className="text-center">Top Gainers</h5>
        <Skelton />
        <Skelton />
        <Skelton />
        <Skelton />
        <Skelton />
        <Skelton />
      </div>
    );
  }

  if (error) {
    return (
      <aside className="px-3 fixed hidden md:block">
        <h5 className="text-center mt-4">Trending</h5>
        <div className=" overflow-y-scroll gap-6 m-5 flex flex-col h-[90vh] px-3 justify-center items-center">
          <span className="text-red-500">error occured</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="px-3 fixed hidden md:block">
      <h5 className="text-center mt-4">Trending</h5>
      <div className=" overflow-y-scroll gap-6 m-5 flex flex-col h-[90vh] px-3">
        {data?.most_actively_traded.map((el) => (
          <Card
            key={el.ticker}
            name={el.ticker}
            change={el.change_percentage}
            price={el.price}
          />
        ))}
      </div>
    </aside>
  );
};
