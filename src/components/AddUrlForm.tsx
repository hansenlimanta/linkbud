import { FC, FormEvent, useState } from "react";
import { Link } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import { RiLayoutTop2Line } from "react-icons/ri";
import { api } from "~/utils/api";
import { LinkType, useLinksStore } from "~/store/linksStore";

const AddUrlForm = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [isAddUrl, setIsAddUrl] = useState(false);
  const createLink = api.links.addLink.useMutation();
  const addLink = useLinksStore((state) => state.addLink);
  const links = useLinksStore((state) => state.links);

  const handleSubmitUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newLink: Link = await createLink.mutateAsync({
      id: Math.floor(Math.random() * 100000000).toString(),
      title: "Test URL",
      url: inputUrl,
      isActive: true,
      type: LinkType.Classic,
      position: links.length,
    });

    addLink(newLink);
    setInputUrl("");
    setIsAddUrl(false);
  };
  const handleAddHeader = async () => {
    const newLink: Link = await createLink.mutateAsync({
      id: Math.floor(Math.random() * 100000000).toString(),
      title: "Test HEADER",
      url: "",
      isActive: true,
      type: LinkType.Header,
      position: links.length,
    });

    addLink(newLink);
  };
  return (
    <>
      {isAddUrl ? (
        <div className="relative flex w-full flex-col justify-center rounded-xl border bg-white p-6 align-baseline transition-all ease-in-out">
          <div
            className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 transition-all hover:bg-slate-100"
            onClick={() => setIsAddUrl(false)}
          >
            <RxCross2 />
          </div>
          <h2 className="mb-4 text-xl font-bold">Enter URL</h2>
          <form
            onSubmit={(e) => handleSubmitUrl(e)}
            className="flex w-full justify-between gap-4"
          >
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              type="text"
              placeholder="URL"
              className="w-full rounded-lg border bg-stone-100 px-4 py-2"
            />
            <button className="rounded-full border bg-stone-50 px-5 py-2 transition-all hover:bg-stone-200">
              Add
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsAddUrl(true)}
          className="w-full rounded-full bg-amber-200 px-4 py-3 font-semibold transition-all ease-in-out hover:bg-amber-300"
        >
          + Add Link
        </button>
      )}
      <div className="w-full">
        <button
          onClick={handleAddHeader}
          className="flex items-center justify-center gap-2 rounded-full border-2 bg-inherit px-4 py-2 hover:bg-white"
        >
          <RiLayoutTop2Line />
          Add header
        </button>
      </div>
    </>
  );
};

export default AddUrlForm;
