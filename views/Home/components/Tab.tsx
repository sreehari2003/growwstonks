interface props<T> {
  label: string;
  value: T;
  activeTab: string;
  setActiveTab: React.Dispatch<T>;
}

export const Tab = <T,>({
  label,
  activeTab,
  setActiveTab,
  value,
}: props<T>) => {
  return (
    <span
      className={`font-bold hover:cursor-pointer text-sm md:text-lg ${
        activeTab === value ? "border-orange-900 border-b-2 " : ""
      }`}
      onClick={() => setActiveTab(value)}
    >
      {label}
    </span>
  );
};
