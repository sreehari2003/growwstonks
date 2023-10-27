export const StockStatus = ({ val }: { val: string }) => {
  const score = val.split("%")[0];

  if (Number(score) > 0) {
    return <span className="text-green-500">{val}</span>;
  } else {
    return <span className="text-red-400">{val}</span>;
  }
};
