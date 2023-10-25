import { StockStatus } from "./StockStatus";

type Data = {
  change: string;
  name: string;
  price: string;
};

export const Card = ({ change, name, price }: Data) => {
  return (
    <div className="border-2 hover:cursor-pointer flex flex-col rounded-md">
      <div className="px-8">
        <h5 className="mt-3">{name}</h5>
        <span className="mt-1">${price}</span>
        <StockStatus val={change} />
      </div>
    </div>
  );
};
