import { getUser } from "utils/store/auth-store";

export default function ProfilePage() {
  const user = getUser();
  const initials = user?.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen  p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-100 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-100 blur-3xl" />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-700">
              User Profile
            </p>

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-bold text-white shadow-lg">
                {initials}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {user?.name}
                </h1>
                <p className="mt-1 text-slate-600">{user?.email}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <InfoBlock label="Full Name" value={user?.name} />
              <InfoBlock label="Email Address" value={user?.email} />
              <InfoBlock label="User ID" value={user?.id} full />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  full,
}: {
  label: string;
  value?: string;
  full?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 break-all font-medium text-slate-800">{value}</p>
    </div>
  );
}
