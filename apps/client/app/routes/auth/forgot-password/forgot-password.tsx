import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 text-center">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Parolni unutdingizmi?
          </h2>
          <p className="mt-2 text-sm text-gray-600 mb-8">
            Havotir olmang, biz sizga tiklash ko'rsatmalarini yuboramiz.
          </p>

          <form className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email manzilingiz
              </label>
              <input
                type="email"
                placeholder="misol@mail.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
              Parolni tiklash
            </button>
          </form>

          <div className="mt-6">
            <NavLink
              to="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Ortga qaytish
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
