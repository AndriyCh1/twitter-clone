import { Outlet } from "react-router-dom";
import { RightPanel, Sidebar } from "../common";

export const MainLayout = () => {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <Outlet />
      <RightPanel />
    </div>
  );
};
