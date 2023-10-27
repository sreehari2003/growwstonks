import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useDebounce } from "@app/hooks";
import { Dialog, DialogTrigger, DialogContent } from "@app/components/Dialog";

export const TopNav = () => {
  const [searchData, setSearchData] = useState("");

  const [tags, setTags] = useState<Array<string>>(["all"]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target?.value;

    // handle error here
    if (!input.length) return;

    setSearchData(input);

    // call nessecery api here
  };

  const addtag = (el: string) => {
    if (tags.includes("all")) {
      if (el !== "all") {
        const updatedItems = tags.filter((item) => item !== "all");
        setTags([...updatedItems, el]);
        return;
      }
    }

    if (tags.includes(el)) {
      const updatedItems = tags.filter((item) => item !== el);
      setTags(updatedItems);
      return;
    }
    setTags((d) => [...d, el]);
  };

  return (
    <nav className="border-3 flex py-10  px-5 h-20 bg-orange-800  items-center justify-around">
      <Link href="/">
        <h3 className="text-sm md:text-xl lg:text-2xl text-yellow-50">
          GrowwStonks
        </h3>
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <div className="rounded-3xl p-2  md:p-3 focus:outline-none w-[180px] md:w-[350px]  bg-orange-950 placeholder:text-gray-300 text-white hover:cursor-pointer">
            Search stock and etf
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <input
            onChange={handleSearch}
            className="rounded-3xl p-2 w-full md:p-3 focus:outline-none  md:w-[350px]  bg-orange-950 placeholder:text-gray-300 text-white"
            placeholder="search here"
          />
          <div className="flex py-4 gap-3">
            <div
              className={`border-2 p-2 rounded-full hover:cursor-pointer ${
                tags.includes("all") ? "bg-orange-900 text-white" : ""
              }`}
              onClick={() => addtag("all")}
            >
              all
            </div>
            <div
              className={`border-2 p-2 rounded-full hover:cursor-pointer ${
                tags.includes("stock") ? "bg-orange-900 text-white" : ""
              }`}
              onClick={() => addtag("stock")}
            >
              Stock
            </div>
            <div
              className={`rounded-full border-2 p-2 hover:cursor-pointer ${
                tags.includes("ETF") ? "bg-orange-900 text-white" : ""
              }`}
              onClick={() => addtag("ETF")}
            >
              ETF
            </div>
          </div>
          {searchData.length > 1 && <h1>hello</h1>}
        </DialogContent>
      </Dialog>
    </nav>
  );
};
