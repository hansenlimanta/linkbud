import { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";

type ProfileProps = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
    pageTitle?: string | null;
    description?: string | null;
  };
};

const Profile: FC<ProfileProps> = ({ user }) => {
  const updatePageTitle = api.user.updatePageTitle.useMutation();
  const [pageTitle, setPageTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (user.pageTitle !== null && user.pageTitle !== undefined) {
      setPageTitle(user.pageTitle);
    }
    if (user.description !== null && user.description !== undefined) {
      setDescription(user.description);
    }
  }, []);

  return (
    <div className="flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Profile</p>
      <div className="flex flex-col gap-8 rounded-2xl bg-white p-6">
        <div className="flex w-full items-center justify-start gap-4">
          <div className="flex items-center justify-center p-1">
            <div className="h-20 w-20 rounded-full bg-red-400" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <button className="w-full rounded-full bg-green-500 p-3 font-medium text-white hover:bg-green-600">
              Pick an image
            </button>
            <button className="w-full rounded-full border bg-white p-3 font-medium text-black hover:bg-slate-300">
              Remove
            </button>
          </div>
        </div>
        <form className="flex w-full flex-col gap-4">
          <div>
            <label
              htmlFor="pageTitle"
              className="pb-1 pl-1 text-xs text-gray-500"
            >
              Page Title
            </label>
            <input
              id="pageTitle"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              type="text"
              placeholder="Page title"
              className="w-full rounded-lg border bg-stone-100 px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="pb-1 pl-1 text-xs text-gray-500"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full rounded-lg border bg-stone-100 px-3 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
