import { ChartType } from "@app/types";

export const filterAndFormatChartData = (
  selectedFilter: ChartType,
  chartData: any
) => {
  const currentDate = new Date();
  const googleChartData = [["Date", "Open", "High", "Low", "Close"]];
  let filteredData = [];

  switch (selectedFilter) {
    case ChartType["24h"]:
      const twentyFourHoursAgo = new Date(currentDate);
      twentyFourHoursAgo.setDate(currentDate.getDate() - 1);

      filteredData = chartData.filter((item: any) => {
        const itemDate = new Date(item[0]);
        return itemDate >= twentyFourHoursAgo && itemDate <= currentDate;
      });
      break;

    case ChartType["7d"]:
      const sevenDaysAgo = new Date(currentDate);
      sevenDaysAgo.setDate(currentDate.getDate() - 7);

      filteredData = chartData.filter((item: any) => {
        const itemDate = new Date(item[0]);
        return itemDate >= sevenDaysAgo && itemDate <= currentDate;
      });
      break;

    case ChartType["1m"]:
      const oneMonthAgo = new Date(currentDate);
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);

      filteredData = chartData.filter((item: any) => {
        const itemDate = new Date(item[0]);
        return itemDate >= oneMonthAgo && itemDate <= currentDate;
      });
      break;

    case ChartType["1y"]:
      const oneYearAgo = new Date(currentDate);
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

      filteredData = chartData.filter((item: any) => {
        const itemDate = new Date(item[0]);
        return itemDate >= oneYearAgo && itemDate <= currentDate;
      });
      break;

    case ChartType["10y"]:
      const tenYearsAgo = new Date(currentDate);
      tenYearsAgo.setFullYear(currentDate.getFullYear() - 10);

      filteredData = chartData.filter((item: any) => {
        const itemDate = new Date(item[0]);
        return itemDate >= tenYearsAgo && itemDate <= currentDate;
      });
      break;

    default:
      filteredData = chartData;
      break;
  }

  filteredData.forEach((item: any) => {
    const day = item[0]; // Assuming the date is in the desired format
    const a = parseFloat(item[1]);
    const b = parseFloat(item[2]);
    const c = parseFloat(item[3]);
    const d = parseFloat(item[4]);

    googleChartData.push([day, a, b, c, d]);
  });

  return googleChartData;
};
