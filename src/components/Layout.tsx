import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { IntelligentLeadWidget } from "./IntelligentLeadWidget";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <IntelligentLeadWidget />
    </div>
  );
}
