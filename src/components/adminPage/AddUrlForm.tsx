import { useState } from "react";
import { Link } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import { RiLayoutTop2Line } from "react-icons/ri";
import { api } from "~/utils/api";
import { LinkType, useLinksStore } from "~/store/linksStore";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  url: string;
};

const AddUrlForm = () => {
  const [isAddUrl, setIsAddUrl] = useState(false);
  const createLink = api.links.addLink.useMutation();
  const addLink = useLinksStore((state) => state.addLink);
  const orderDbFormat = useLinksStore((state) => state.orderDbFormat);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const handleSubmitUrl: SubmitHandler<Inputs> = async (data) => {
    let url = data.url;
    if (
      data.url.slice(0, 7) !== "http://" &&
      data.url.slice(0, 8) !== "https://"
    ) {
      url = `http://${data.url}`;
    }

    const newLink = {
      id: Math.floor(Math.random() * 100000000).toString(),
      title: "Test URL",
      url: url,
      isActive: true,
      type: LinkType.Classic,
    } as Link;
    addLink(newLink);

    createLink.mutateAsync({
      ...newLink,
      order: orderDbFormat,
    });
    setIsAddUrl(false);
    resetField("url");
  };
  const handleAddHeader = () => {
    const newLink = {
      id: Math.floor(Math.random() * 100000000).toString(),
      title: "Test HEADER",
      url: "",
      isActive: true,
      type: LinkType.Header,
    } as Link;
    addLink(newLink);

    createLink.mutateAsync({
      ...newLink,
      order: orderDbFormat,
    });
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
            onSubmit={handleSubmit(handleSubmitUrl)}
            className="flex w-full justify-between gap-4"
          >
            <input
              placeholder="URL"
              className="w-full rounded-lg border bg-stone-100 px-4 py-2"
              {...register("url", {
                pattern:
                  /^[-a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&//=]*)$/,
              })}
            />
            <button
              type="submit"
              disabled={!isValid || !isDirty}
              className={`rounded-full border px-5 py-2 transition-all ${
                !isValid || !isDirty
                  ? "cursor-default bg-stone-50 text-gray-500"
                  : "cursor-pointer bg-stone-100 text-black hover:bg-stone-200"
              }`}
            >
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
