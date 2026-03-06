import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
