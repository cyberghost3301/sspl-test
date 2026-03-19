import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CommandMenu } from "./CommandMenu";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CommandMenu />
      <FloatingWhatsApp />
    </div>
  );
}
