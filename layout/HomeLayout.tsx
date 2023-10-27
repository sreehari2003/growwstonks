import { Child } from "@app/types";
import { TopNav } from "./components";

export const HomeLayout = ({ children }: Child) => {
  return (
    <section>
      <TopNav />
      {children}
    </section>
  );
};
