import Link from "next/link";
import AccountPopover from "./AccountPopover";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { PiIntersectSquareThin } from "react-icons/pi";
import { BsBarChart } from "react-icons/bs";
import { TbSettings2 } from "react-icons/tb";
import { PiTreePalmFill } from "react-icons/pi";

const AdminNav = () => {
  return (
    <nav className="fixed top-0 z-20 w-full p-2">
      <div className="flex w-full items-center justify-between rounded-full bg-white px-8 py-2">
        <div className="flex items-center justify-start gap-3">
          <Link href={"/admin"}>
            <div className="mr-4 cursor-pointer font-bold">
              <PiTreePalmFill size={27} />
            </div>
          </Link>
          <Link href={"/admin"}>
            <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
              <HiMiniBars3BottomLeft size={18} />
              <p>Links</p>
            </div>
          </Link>
          <Link href={"/admin/appearance"}>
            <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
              <PiIntersectSquareThin size={20} />
              <p>Appearance</p>
            </div>
          </Link>
          <Link href={"/admin/analytics"}>
            <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
              <BsBarChart size={18} />
              <p>Analytics</p>
            </div>
          </Link>
          <Link href={"/admin/settings"}>
            <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
              <TbSettings2 size={18} />
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
