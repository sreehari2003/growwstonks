import { HomeLayout } from "@app/layout";
import { NextPageWithLayout } from "next";
import React from "react";

const Custom: NextPageWithLayout = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <h2 className="text-xl font-semibold">
        Api Daily limit exceeded please try again tomorrow
      </h2>
    </div>
  );
};

Custom.Layout = HomeLayout;
export default Custom;
