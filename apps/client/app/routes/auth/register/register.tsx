import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { trpc } from "utils/trpc";
import { setUser } from "utils/store/auth-store";
import { cn } from "utils/cn.js";
import { type User } from "@my-app/zod";

interface Inputs extends User {
  passwordRequired: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();
  const { mutate, isPending } = trpc.auth.register.useMutation({
    onSuccess(data) {
      console.log(data);
      setUser(data);
      navigate("/dashboard/personal", { replace: true });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { passwordRequired, ...newUser } = data;
    mutate({ ...newUser });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Ro'yxatdan o'tish
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To'liq ismingiz
              </label>
              <input
                type="text"
                {...register("name")}
                required
                placeholder="Ali Valiyev"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parol yarating
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("passwordRequired")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
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
              {isPending ? "Yuborilmoqda..." : "Hisob yaratish"}
            </button>
            <NavLink
              to="/login"
              type="submit"
              className="w-max mx-auto mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium items-center gap-3 text-indigo-600 hover:text-indigo-700 transition"
            >
              Login <ArrowRight size={16} />
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
