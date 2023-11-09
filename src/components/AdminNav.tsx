import Link from "next/link";
import AccountPopover from "./AccountPopover";

const AdminNav = () => {
  return (
    <nav className="fixed top-0 z-20 w-full p-2">
      <div className="flex w-full items-center justify-between rounded-full bg-white px-8 py-2">
        <div className="flex items-center justify-start gap-4">
          <Link href={"/admin"}>
            <p className="cursor-pointer px-4 text-2xl font-bold">Linkbud</p>
          </Link>
          <Link href={"/admin"}>
            <div className="cursor-pointer rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-slate-100">
              <p>Links</p>
            </div>
          </Link>
          <Link href={"/admin/appearance"}>
            <div className="cursor-pointer rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-slate-100">
              <p>Appearance</p>
            </div>
          </Link>
          <Link href={"/admin/analytics"}>
            <div className="cursor-pointer rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-slate-100">
              <p>Analytics</p>
            </div>
          </Link>
          <Link href={"/admin/settings"}>
            <div className="cursor-pointer rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-slate-100">
              <p>Settings</p>
            </div>
          </Link>
        </div>
        <div>
          <AccountPopover />
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
