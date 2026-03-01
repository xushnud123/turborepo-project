import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { trpc } from "utils/trpc";
import { cn } from "utils/cn";
import { setUser } from "utils/store/auth-store";

interface Inputs {
  email: string;
  password: string;
}
const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = trpc.auth.login.useMutation({
    onSuccess(data) {
      setUser(data);
      navigate("/dashboard", { replace: true });
    },
  });
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Hisobga kirish
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Yoki{" "}
          <NavLink
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            yangi hisob oching
          </NavLink>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email manzilingiz
              </label>
              <input
                type="email"
                {...register("email")}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parol
              </label>
              <input
                type="password"
                {...register("password")}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Eslab qolish
                </label>
              </div>
              <div className="text-sm">
                <NavLink
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Parolni unutdingizmi?
                </NavLink>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "w-full mt-4 flex justify-center py-2 px-4 border rounded-md text-white transition",
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700",
              )}
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
