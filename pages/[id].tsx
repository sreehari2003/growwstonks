import { ENV } from "@app/config";
import { StockLayout } from "@app/layout";
import { Footer, TopBar, ChartView } from "@app/views/Stock";
import { info } from "@app/data/overView";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageWithLayout,
} from "next";

const Stock: NextPageWithLayout = ({
  res,
  route,
  price,
  change,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="mb-4 md:p-16 pt-10 md:ml-40 w-full">
      <TopBar
        name={res.Name}
        assetType={res.AssetType}
        exchange={res.Exchange}
        price={price}
        change={change}
      />
      <ChartView id={route} />
      <Footer
        name={res.Name}
        symbol={res.Symbol}
        description={res.Description}
        weekLow52={res["52WeekLow"]}
        weekHigh52={res["52WeekHigh"]}
        marketCapitalization={res.MarketCapitalization}
        peRatio={res.PERatio}
        pegRatio={res.PEGRatio}
        beta={res.Beta}
        sector={res.Sector}
        industry={res.Industry}
        divident={res.DividendYield}
        profitMargin={res.ProfitMargin}
      />
    </main>
  );
};

Stock.Layout = StockLayout;

export default Stock;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let { id, price, change } = ctx.query;

  const endPoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=${ENV.api_token}`;

  const data = await fetch(endPoint);

  const res = await data.json();

  if (res["Information"]) {
    return {
      redirect: {
        destination: "/500",
        permanent: true,
      },
    };
  }

  return {
    props: {
      res: res,
      route: id as string,
      price: "$ " + price,
      change: change + "%",
    },
  };
};
