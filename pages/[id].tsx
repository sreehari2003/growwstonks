import { StockLayout } from "@app/layout";
import { Footer, TopBar, Chart } from "@app/views/Stock";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageWithLayout,
} from "next";

const d = {
  Symbol: "IBM",
  AssetType: "Common Stock",
  Name: "International Business Machines",
  Description:
    "International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",
  CIK: "51143",
  Exchange: "NYSE",
  Currency: "USD",
  Country: "USA",
  Sector: "TECHNOLOGY",
  Industry: "COMPUTER & OFFICE EQUIPMENT",
  Address: "1 NEW ORCHARD ROAD, ARMONK, NY, US",
  FiscalYearEnd: "December",
  LatestQuarter: "2023-09-30",
  MarketCapitalization: "124880708000",
  EBITDA: "12692000000",
  PERatio: "58.58",
  PEGRatio: "1.276",
  BookValue: "25.29",
  DividendPerShare: "1.65",
  DividendYield: "0.0484",
  EPS: "2.34",
  RevenuePerShareTTM: "67.29",
  ProfitMargin: "0.113",
  OperatingMarginTTM: "0.14",
  ReturnOnAssetsTTM: "0.0407",
  ReturnOnEquityTTM: "0.328",
  RevenueTTM: "61168001000",
  GrossProfitTTM: "32688000000",
  DilutedEPSTTM: "2.34",
  QuarterlyEarningsGrowthYOY: "0.126",
  QuarterlyRevenueGrowthYOY: "0.046",
  AnalystTargetPrice: "137.35",
  TrailingPE: "58.58",
  ForwardPE: "15.55",
  PriceToSalesRatioTTM: "2.108",
  PriceToBookRatio: "6.75",
  EVToRevenue: "2.969",
  EVToEBITDA: "25.81",
  Beta: "0.771",
  "52WeekHigh": "151.93",
  "52WeekLow": "118.71",
  "50DayMovingAverage": "143.37",
  "200DayMovingAverage": "135.33",
  SharesOutstanding: "911006000",
  DividendDate: "2023-09-09",
  ExDividendDate: "2023-08-09",
};

const Stock: NextPageWithLayout = ({
  res,
  route,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log("name is", route);
  return (
    <main className="mb-4 p-16 pt-10 ml-40">
      <TopBar name={d.Name} assetType={d.AssetType} exchange={d.Exchange} />
      <Chart id={route} />
      <Footer
        name={d.Name}
        symbol={d.Symbol}
        description={d.Description}
        weekLow52={d["52WeekLow"]}
        weekHigh52={d["52WeekHigh"]}
        marketCapitalization={d.MarketCapitalization}
        peRatio={d.PERatio}
        pegRatio={d.PEGRatio}
        beta={d.Beta}
        sector={d.Sector}
        industry={d.Industry}
      />
    </main>
  );
};

Stock.Layout = StockLayout;

export default Stock;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  //   const endPoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=fghdjkgdhfjgfdjkgk`;

  //   const data = await fetch(endPoint);

  //   const res = await data.json();

  //   if (res["Information"]) {
  //     return {
  //       notFound: true,
  //     };
  //   }

  return {
    props: {
      res: [],
      route: id as string,
    },
  };
};
