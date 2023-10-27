import { formatCurrencyShort } from "@app/utils/formatCurreny";

type IResponse = {
  symbol: string;
  name: string;
  description: string;
  weekLow52: string;
  weekHigh52: string;
  marketCapitalization: string;
  peRatio: string;
  pegRatio: string;
  beta: string;
  sector: string;
  industry: string;
  divident: string;
  profitMargin: string;
};

export const Footer = ({
  name,
  description,
  industry,
  sector,
  marketCapitalization,
  beta,
  peRatio,
  divident,
  profitMargin,
}: IResponse) => {
  return (
    <footer className="flex flex-col  border-2 m-2">
      <h1 className="p-5 border-b-2">About: {name}</h1>
      {description !== "None" && <p className="p-5 pt-2">{description}</p>}
      <div className="flex p-5 gap-4">
        <span className="bg-chip p-5 rounded-3xl text-brand">
          Industry: {industry}
        </span>
        <span className="bg-chip p-5 rounded-3xl text-brand">
          Sector: {sector}
        </span>
      </div>
      <section className="stats flex justify-between p-5 flex-wrap gap-3">
        <div className="flex flex-col">
          <span>Market Cap</span>
          <span className="font-semibold">
            {formatCurrencyShort(+marketCapitalization)}
          </span>
        </div>
        <div className="flex flex-col">
          <span>P/E Ratio</span>
          <span className="font-semibold">{peRatio}</span>
        </div>
        <div className="flex flex-col">
          <span>Beta</span>
          <span className="font-semibold">{beta}</span>
        </div>
        <div className="flex flex-col">
          <span>Divident yield</span>
          <span className="font-semibold">{divident}</span>
        </div>
        <div className="flex flex-col">
          <span>Profit Margin</span>
          <span className="font-semibold">{profitMargin}</span>
        </div>
      </section>
    </footer>
  );
};
