export interface Child {
  children: React.ReactNode;
}

export type Response = {
  Symbol: string;
  Name: string;
  Description: string;
  "52WeekLow": string;
  "52WeekHigh": string;
  MarketCapitalization: string;
  PERatio: string;
  PEGRatio: string;
  Beta: string;
  Sector: string;
  Industry: string;
};
