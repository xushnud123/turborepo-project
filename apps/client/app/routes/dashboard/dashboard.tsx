import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
