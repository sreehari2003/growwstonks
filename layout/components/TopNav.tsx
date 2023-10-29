import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { StockOutlined, SearchOutlined } from "@ant-design/icons";
import { ENV, apiHandler } from "@app/config";
import { debounce } from "@app/hooks/useDeboune";
import { Dialog, DialogTrigger, DialogContent } from "@app/components/Dialog";
import { DummySearch } from "@app/data/search";

export const TopNav = () => {
  const [searchData, setSearchData] = useState<Record<string, string>[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  // setting the recent search to state on mount
  useEffect(() => {
    const history = localStorage.getItem("history");

    if (history) {
      setRecent(JSON.parse(history) as unknown as string[]);
    }
  }, []);

  const [tags, setTags] = useState<Array<string>>(["all"]);

  const [timeOut, setTimeOut] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchData([]);
    let input = e.target?.value;

    // handle error here
    if (!input) return;

    try {
      const { data } = await apiHandler.get(
        `query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${ENV.api_token}`
      );

      if (data["Information"]) {
        throw new Error();
      }

      setSearchData(data.bestMatches);
      setTimeOut(false);
    } catch {
      setTimeOut(true);
    } finally {
      setIsLoading(false);
    }

    setRecent([...recent, input]);

    localStorage.setItem("history", JSON.stringify([...recent, input]));
  });

  // when timout happens we will show the error and
  // after 5s back to recent view state
  useEffect(() => {
    if (timeOut) {
      setTimeout(() => {
        setTimeOut(false);
      }, 5000);
    }
  }, [timeOut]);

  const addtag = (el: string) => {
    if (tags.includes("all")) {
      if (el !== "all") {
        const updatedItems = tags.filter((item) => item !== "all");
        setTags([...updatedItems, el]);
        return;
      }
    }

    if (el === "all") {
      setTags(["all"]);
      return;
    }

    if (tags.includes(el)) {
      const updatedItems = tags.filter((item) => item !== el);

      if (updatedItems.length < 1) {
        setTags(["all"]);
        return;
      }
      setTags(updatedItems);

      return;
    }
    setTags((d) => [...d, el]);
  };

  const goToMain = (val: string) => {
    const t = val.split(".")[0] || val.split(" ")[0];

    router.push(`/${t}`);
  };

  return (
    <nav className="border-3 flex py-10  px-5 h-20 bg-orange-800  items-center justify-around">
      <Link href="/">
        <div className="flex gap-2">
          <h3 className="text-md md:text-xl lg:text-2xl text-yellow-50">
            GrowwStonks
          </h3>
          <h3 className="text-sm md:text-xl lg:text-2xl text-yellow-50">
            <StockOutlined />
          </h3>
        </div>
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <div className="rounded-3xl p-2  md:p-3 focus:outline-none w-[180px] md:w-[350px]  bg-orange-950 placeholder:text-gray-300 text-white hover:cursor-pointer">
            <div className="flex items-center gap-1 md:gap-2">
              <SearchOutlined className="text-sm md:text-lg" />
              <span className="text-sm md:text-lg">Search stock and etf</span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-xl max-h-[400px]">
          <input
            onChange={handleSearch}
            className="rounded-xl p-2 w-full md:p-3 focus:outline-none  md:w-[350px]  bg-orange-950 placeholder:text-gray-300 text-white"
            placeholder="search stock and etf"
          />
          <div className="flex py-4 gap-3">
            <div
              className={`border-2 w-12 flex justify-center items-center rounded-xl hover:cursor-pointer ${
                tags.includes("all") ? "bg-orange-900 text-white" : ""
              }`}
              onClick={() => addtag("all")}
            >
              All
            </div>
            <div
              className={`border-2 p-2 rounded-xl hover:cursor-pointer ${
                tags.includes("Equity") ? "bg-orange-900 text-white" : ""
              }`}
              onClick={() => addtag("Equity")}
            >
              Equity
            </div>
            <div
              className={`rounded-xl border-2 p-2 hover:cursor-pointer ${
                tags.includes("ETF") ? "bg-orange-900 text-white" : ""
              }`}
              onClick={() => addtag("ETF")}
            >
              ETF
            </div>
          </div>
          {isLoading && (
            <div className="flex justify-center items-center h-full ">
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
          )}
          {!searchData.length && !isLoading && !timeOut && (
            <div>
              <span>Recent search</span>
              <hr className="mt-2" />
              <div className="overflow-y-scroll max-h-[180px] ">
                {recent.map((el, index) => (
                  <DialogTrigger asChild key={index}>
                    <div
                      className="border-b-2 pb-2 hover:cursor-pointer max-h-10 overflow-y-scroll"
                      onClick={() => goToMain(el.toUpperCase())}
                    >
                      <span className="text-red-600">{el}</span>
                    </div>
                  </DialogTrigger>
                ))}
              </div>
            </div>
          )}
          {!isLoading && timeOut && (
            <span className="mt-10">
              API Time out happened please try again tomorrow
            </span>
          )}
          <div className="overflow-y-scroll h-40">
            {!isLoading &&
              searchData.length > 0 &&
              !timeOut &&
              searchData.map((el) => {
                if (tags.includes("all")) {
                  return (
                    <DialogTrigger asChild key={el["1. symbol"]}>
                      <div
                        className="flex justify-between border-b-2 pb-3 h-10 hover:cursor-pointer hover:border-red-500"
                        onClick={() => goToMain(el["1. symbol"].toUpperCase())}
                      >
                        <span>{el["1. symbol"]}</span>
                        {/* <span>{el["2. name"]}</span> */}
                      </div>
                    </DialogTrigger>
                  );
                } else if (
                  tags.includes("ETF") &&
                  tags.includes("Equity") &&
                  (el["3. type"] === "ETF" || el["3. type"] === "Equity")
                ) {
                  const newLocal = (
                    <div
                      className="flex justify-between border-b-2 pb-3 h-10 hover:cursor-pointer hover:border-red-500"
                      onClick={() => goToMain(el["1. symbol"].toUpperCase())}
                    >
                      <span>{el["1. symbol"]}</span>
                      {/* <span>{el["2. name"]}</span> */}
                    </div>
                  );
                  return (
                    <DialogTrigger asChild key={el["1. symbol"]}>
                      {newLocal}
                    </DialogTrigger>
                  );
                } else if (tags.includes("ETF") && el["3. type"] === "ETF") {
                  return (
                    <DialogTrigger asChild key={el["1. symbol"]}>
                      <div
                        className="flex justify-between border-b-2 pb-3 h-10 hover:cursor-pointer hover:border-red-500"
                        onClick={() => goToMain(el["1. symbol"].toUpperCase())}
                      >
                        <span>{el["1. symbol"]}</span>
                        {/* <span>{el["2. name"]}</span> */}
                      </div>
                    </DialogTrigger>
                  );
                } else if (
                  tags.includes("Equity") &&
                  el["3. type"] === "Equity"
                ) {
                  return (
                    <DialogTrigger asChild key={el["1. symbol"]}>
                      <div
                        className="flex justify-between border-b-2 pb-3 h-10 hover:cursor-pointer hover:border-red-500"
                        onClick={() => goToMain(el["1. symbol"].toUpperCase())}
                      >
                        <span>{el["1. symbol"]}</span>
                        {/* <span>{el["2. name"]}</span> */}
                      </div>
                    </DialogTrigger>
                  );
                }
              })}
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};
