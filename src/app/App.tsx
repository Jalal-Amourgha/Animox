"use client";

import { Footer, Navbar } from "@/components";
import { usePathname } from "next/navigation";

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  let pathname = usePathname();

  return (
    <>
      {pathname.includes("profile") ? (
        <> {children} </>
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />{" "}
        </>
      )}
    </>
  );
};

export default App;
