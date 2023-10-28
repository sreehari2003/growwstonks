import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

export const StockStatus = ({ val }: { val: string }) => {
  const score = val.split("%")[0];

  if (Number(score) > 0) {
    return (
      <div className="flex gap-2">
        <span className="text-green-500">{val}</span>
        <span className="text-green-500">
          <CaretUpOutlined />
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        <span className="text-red-400">{val}</span>
        <span className="text-red-400">
          <CaretDownOutlined />
        </span>
      </div>
    );
  }
};
