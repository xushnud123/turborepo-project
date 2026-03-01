// routes/dashboard/PrivateRoute.tsx
import { Loader2 } from "lucide-react";
import { type FC, type ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
import { useHydrated, getUser } from "utils/store/auth-store";

interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const user = getUser();
  const hydrated = useHydrated();

  console.log("user", user);

  if (!hydrated)
    return (
      <div className="min-h-screen grid place-items-center bg-slate-100">
        <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-sm border border-slate-200">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-slate-700 font-medium">Yuklanmoqda...</span>
        </div>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
