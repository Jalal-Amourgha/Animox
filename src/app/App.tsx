"use client";

import { Footer, Navbar } from "@/components";
import { AppWrapper } from "@/context";
import { usePathname } from "next/navigation";

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  let pathname = usePathname();

  return (
    <AppWrapper>
      {pathname.includes("profile") ? (
        <> {children} </>
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />{" "}
        </>
      )}
    </AppWrapper>
  );
};

export default App;
