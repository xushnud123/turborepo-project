import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="block">
      <Outlet />
    </div>
  );
};

export default Layout;
