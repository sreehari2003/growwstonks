import { useMemo, useState } from "react";
import { Chart } from "react-google-charts";

import { useStockHistory } from "@app/hooks/api";
import { ChartType } from "@app/types";
import { filterAndFormatChartData } from "@app/utils/filterChartData";

type Prop = {
  id: string;
};

export const ChartView = ({ id }: Prop) => {
  const { isLoading, data: res } = useStockHistory(id);

  const [timeSpan, setTimeSpan] = useState<ChartType>(ChartType["7d"]);

  const data = useMemo(() => {
    if (res) {
      const dataArray = Object.entries(res).map(([date, values]) => {
        return [
          date,
          values["1. open"],
          values["2. high"],
          values["3. low"],
          values["4. close"],
        ];
      });

      return filterAndFormatChartData(timeSpan, dataArray);
    } else {
      return [];
    }
  }, [timeSpan, res]);

  return (
    <div className="h-[400px] mb-8 p-5">
      {isLoading ? (
        <div className="flex justify-center items-center border-2 h-full w-[70%]">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <Chart chartType="Line" height="100%" data={data} options={options} />
      )}
      <div className="inline-flex  mt-3 ml-4 border-2  rounded-md">
        <span
          className={`hover:cursor-pointer border-r-2 px-2 ${
            timeSpan === ChartType["7d"] ? "bg-orange-500 text-white" : ""
          }`}
          onClick={() => setTimeSpan(ChartType["7d"])}
        >
          7d
        </span>
        <span
          className={`hover:cursor-pointer border-x-2 px-2 ${
            timeSpan === ChartType["1m"] ? "bg-orange-500 text-white" : ""
          }`}
          onClick={() => setTimeSpan(ChartType["1m"])}
        >
          1m
        </span>
        <span
          className={`hover:cursor-pointer border-x-2 px-2 ${
            timeSpan === ChartType["1y"] ? "bg-orange-500 text-white" : ""
          }`}
          onClick={() => setTimeSpan(ChartType["1y"])}
        >
          1y
        </span>
        <span
          className={`hover:cursor-pointer border-l-2 px-2 ${
            timeSpan === ChartType["10y"] ? "bg-orange-500 text-white" : ""
          }`}
          onClick={() => setTimeSpan(ChartType["10y"])}
        >
          10y
        </span>
      </div>
    </div>
  );
};

const options = {
  legend: {
    textStyle: {
      color: "#A8A29E",
    },
  },
  animation: {
    duration: 1000,
    easing: "out",
    startup: true,
    trigger: "user",
  },
  backgroundColor: "#FFFFFF",
  hAxis: {
    textStyle: {
      color: "#A8A29E",
    },
  },
  vAxis: {
    textStyle: {
      color: "#A8A29E",
    },
  },
};
