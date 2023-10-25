export const StockStatus = ({ val }: { val: string }) => {
  if (Number(val) > 0) {
    return <div className="text-green-500">Gain</div>;
  } else {
    return <div>Loose</div>;
  }
};
