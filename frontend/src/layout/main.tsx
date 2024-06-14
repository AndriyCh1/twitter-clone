import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/common";

export const MainLayout = () => {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <Outlet />
    </div>
  );
};
