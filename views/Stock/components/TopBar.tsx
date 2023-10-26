interface Props {
  name: string;
  exchange: string;
  assetType: string;
}

export const TopBar = ({ name, exchange, assetType }: Props) => {
  return (
    <div className="flex justify-between p-5">
      <div className="flex flex-col justify-start">
        <span>{name}</span>
        <span>{assetType}</span>
        <span>{exchange}</span>
      </div>
      <div className="flex flex-col justify-start">
        <span>{assetType}</span>
        <span>{exchange}</span>
      </div>
    </div>
  );
};
