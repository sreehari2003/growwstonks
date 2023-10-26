import { useState } from "react";
import { NextPageWithLayout } from "next";
import { HomeLayout } from "@app/layout";
import { Gainers, Loosers, Tab } from "@app/views/Home";

type Tabs = "gainers" | "loosers";

const Home: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState<Tabs>("gainers");
  return (
    <section className="m-10 px-16">
      <div className="flex gap-2">
        <Tab
          activeTab={activeTab}
          label="Top Gainers"
          value="gainers"
          setActiveTab={setActiveTab}
        />
        <Tab
          activeTab={activeTab}
          label="Top Loosers"
          value="loosers"
          setActiveTab={setActiveTab}
        />
      </div>
      {activeTab === "gainers" ? <Gainers /> : <Loosers />}
    </section>
  );
};

Home.Layout = HomeLayout;
export default Home;
