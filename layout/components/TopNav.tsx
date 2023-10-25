export const TopNav = () => {
  return (
    <nav className="border-3 w-screen flex py-10  px-5 h-20 bg-orange-800  items-center justify-around">
      <h3 className="text-2xl text-yellow-50">GrowwStonks</h3>
      <input
        placeholder="search stock and etf"
        className="rounded-3xl p-3 focus:outline-none w-[350px] bg-orange-950 placeholder:text-gray-300 text-white"
      />
    </nav>
  );
};
