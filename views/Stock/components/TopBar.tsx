import { StockStatus } from "@app/components/StockStatus";

interface Props {
  name: string;
  exchange: string;
  assetType: string;
  price: string;
  change: string;
}

export const TopBar = ({ name, exchange, assetType, price, change }: Props) => {
  return (
    <div className="flex justify-between p-5">
      <div className="flex flex-col justify-start">
        <span>{name}</span>
        <span>{assetType}</span>
        <span>{exchange}</span>
      </div>
      <div className="flex flex-col justify-start">
        <span>{price}</span>
        <StockStatus val={change} />
      </div>
    </div>
  );
};
