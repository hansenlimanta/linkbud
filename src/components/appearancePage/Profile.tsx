import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";

type ProfileProps = {
  pageTitle: string | null | undefined;
  description: string | null | undefined;
  profile: string | null | undefined;
};

const Profile: FC<ProfileProps> = ({ description, pageTitle, profile }) => {
  const utils = api.useContext();
  const updatePageTitle = api.user.updatePageTitle.useMutation({
    onSuccess: async () => {
      await utils.user.getUserAndTheme.invalidate();
      await utils.links.getLinksById.invalidate();
    },
  });
  const updateDescription = api.user.updateDescription.useMutation({
    onSuccess: async () => {
      await utils.user.getUserAndTheme.invalidate();
      await utils.links.getLinksById.invalidate();
    },
  });
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  useEffect(() => {
    if (pageTitle !== null && pageTitle !== undefined) {
      setTitle(pageTitle);
    }
    if (description !== null && description !== undefined) {
      setDesc(description);
    }
  }, []);
  useEffect(() => {
    const timeOutId = setTimeout(
      () => updatePageTitle.mutate({ pageTitle: title }),
      2000,
    );
    return () => clearTimeout(timeOutId);
  }, [title]);
  useEffect(() => {
    const timeOutId = setTimeout(
      () => updateDescription.mutate({ description: desc }),
      2000,
    );
    return () => clearTimeout(timeOutId);
  }, [desc]);

  return (
    <div className="flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Profile</p>
      <div className="flex flex-col gap-8 rounded-2xl bg-white p-6">
        <div className="flex w-full items-center justify-start gap-4">
          <div className="flex items-center justify-center p-1">
            {profile ? (
              <Image
                className="rounded-full"
                src={profile}
                height={80}
                width={80}
                alt="profile"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-red-400" />
            )}
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex w-full flex-col gap-4"
        >
          <div>
            <label
              htmlFor="pageTitle"
              className="pb-1 pl-1 text-xs text-gray-500"
            >
              Page Title
            </label>
            <input
              id="pageTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
