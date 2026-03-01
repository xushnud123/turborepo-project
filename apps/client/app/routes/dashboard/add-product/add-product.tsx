// AddProductPage.tsx
import { useForm } from "react-hook-form";
import { trpc } from "utils/trpc";

type AddProductForm = {
  title: string;
  description: string;
  price: number;
};

export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductForm>();
  const { mutate, isPending } = trpc.products.create.useMutation();

  const onSubmit = async (data: AddProductForm) => {
    mutate(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-slate-800">Add Product</h1>
        <p className="mt-1 text-sm text-slate-500">
          Title, description va price kiriting.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title majburiy",
                minLength: { value: 3, message: "Kamida 3 ta belgi kiriting" },
              })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Product title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows={4}
              {...register("description", {
                required: "Description majburiy",
                minLength: {
                  value: 10,
                  message: "Kamida 10 ta belgi kiriting",
                },
              })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Product description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price majburiy",
                valueAsNumber: true,
                min: {
                  value: 0.01,
                  message: "Price 0 dan katta bo‘lishi kerak",
                },
              })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="99.99"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
