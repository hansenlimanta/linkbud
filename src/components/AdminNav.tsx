import Link from "next/link";

const AdminNav = () => {
  return (
    <nav className="fixed top-0 z-20 w-full p-2">
      <div className="flex w-full items-center justify-between rounded-full bg-white px-8 py-2">
        <div className="flex items-center justify-start gap-4">
          <p className="cursor-pointer px-4 text-2xl font-bold">Linkbud</p>
          <div className="cursor-pointer rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-slate-100">
            <p>Links</p>
          </div>
          <div className="cursor-pointer rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-slate-100">
            <p>Appearance</p>
          </div>
          <div className="cursor-pointer rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-slate-100">
            <p>Analytics</p>
          </div>
          <div className="cursor-pointer rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-slate-100">
            <p>Settings</p>
          </div>
        </div>
        <div>
          <Link href="/admin">
            <div className="h-10 w-10 rounded-full bg-pink-300 font-medium transition hover:bg-pink-400" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
