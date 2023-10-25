import Image from "next/image";
import Google from "@app/public/google.avif";

export const Card = () => {
  return (
    <div className="border-2 hover:cursor-pointer flex flex-col rounded-md">
      <Image src={Google} width={100} height={100} alt="google" />
      <div className="px-8">
        <h5 className="mt-3">Google india</h5>
        <span className="mt-1">$139.72</span>
      </div>
    </div>
  );
};
