import { useState, type FC } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { User, Database, LogOut, Menu, X, PackagePlus } from "lucide-react";
import { getUser, setUser } from "utils/store/auth-store";

interface LayoutsProps {}

const Layouts: FC<LayoutsProps> = ({}) => {
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  if (activeTab === "dashboard") {
    navigate("/dashboard/personal");
  }

  const user = getUser();

  const menuItems = [
    { id: "personal", name: "Personal Data", icon: <User size={20} /> },
    { id: "product", name: "All Data", icon: <Database size={20} /> },
    {
      id: "add-product",
      name: "Add Product",
      icon: <PackagePlus size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          {isSidebarOpen && (
            <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
              {user?.name.slice(0, 2)}
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              to={`/dashboard/${item.id}`}
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
              }`}
            >
              {item.icon}
              {isSidebarOpen && (
                <span className="font-medium">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setUser(null)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Chiqish</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col  overflow-hidden h-[100vh] px-4 py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Layouts;
