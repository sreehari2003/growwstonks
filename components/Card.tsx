import { useRouter } from "next/router";
import { StockStatus } from "./StockStatus";

type Data = {
  change: string;
  name: string;
  price: string;
};

export const Card = ({ change, name, price }: Data) => {
  const router = useRouter();

  const goToMoreInfo = () => {
    router.push({
      pathname: `/${name}`,
      query: {
        price: price,
        change: change.split("%")[0],
      },
    });
  };

  return (
    <div
      className="border-2 hover:cursor-pointer flex flex-col rounded-xl"
      onClick={goToMoreInfo}
    >
      <div className="w-[140px] flex flex-col items-start p-3 gap-2">
        <h5 className="font-bold">{name}</h5>
        <span>${price}</span>
        <StockStatus val={change} />
      </div>
    </div>
  );
};
