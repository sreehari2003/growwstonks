import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useDebounce } from "@app/hooks";

export const TopNav = () => {
  const [searchData, setSearchData] = useState("");

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target?.value;

    // handle error here
    if (!input.length) return;

    // call nessecery api here
  };

  return (
    <nav className="border-3 flex py-10  px-5 h-20 bg-orange-800  items-center justify-around">
      <Link href="/">
        <h3 className="text-sm md:text-xl lg:text-2xl text-yellow-50">
          GrowwStonks
        </h3>
      </Link>
      <input
        onChange={handleSearch}
        placeholder="search stock and etf"
        className="rounded-3xl p-2  md:p-3 focus:outline-none w-[180px] md:w-[350px]  bg-orange-950 placeholder:text-gray-300 text-white"
      />
    </nav>
  );
};
