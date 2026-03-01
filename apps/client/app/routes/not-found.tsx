import { NavLink } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Sahifa topilmadi
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Uzr, siz qidirayotgan sahifa mavjud emas yoki ko'chirib yuborilgan.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NavLink
            to="/"
            className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Bosh sahifaga qaytish
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
