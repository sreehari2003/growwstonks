import { Child } from "@app/types";
import { TopNav } from "./components";
import { StockNav } from "./components/StockNav";

export const StockLayout = ({ children }: Child) => {
  return (
    <main>
      <TopNav />
      <div className="flex">
        <StockNav />
        {children}
      </div>
    </main>
  );
};
