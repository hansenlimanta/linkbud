import { useState } from "react";
import Head from "next/head";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import AdminNav from "~/components/AdminNav";
import DraggableLink from "~/components/DraggableLink";
import DraggableHeader from "~/components/DraggableHeader";
import { Link, LinkType, useUserStore } from "~/store/userStore";
import { RiLayoutTop2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export default function Admin() {
  const addLink = useUserStore((state) => state.addLink);
  const [inputUrl, setInputUrl] = useState("");
  const [isAddUrl, setIsAddUrl] = useState(false);
  const links = useUserStore((state) => state.links);
  const updateOrders = useUserStore((state) => state.updateOrders);
  const handleSubmitUrl = () => {
    const newLink: Link = {
      id: Math.floor(Math.random() * 100000000).toString(),
      title: "Test",
      url: inputUrl,
      isActive: true,
      type: LinkType.Classic,
    };
    console.log(newLink);

    addLink(newLink);
    setInputUrl("");
    setIsAddUrl(false);
  };
  const handleAddHeader = () => {
    const newLink: Link = {
      id: Math.floor(Math.random() * 100000000).toString(),
      title: "Test",
      url: "",
      isActive: true,
      type: LinkType.Header,
    };
    console.log(newLink);

    addLink(newLink);
  };

  return (
    <>
      <Head>
        <title>Linkbud Admin</title>
        <meta name="description" content="linkbud admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-stone-100">
        <AdminNav />
        <DragDropContext onDragEnd={(e) => updateOrders(e)}>
          <div className="!ml-0 mr-[570px] overflow-x-auto">
            <div className="mt-20 w-full px-6">
              <div className="flex h-20 w-full items-center justify-between rounded-3xl bg-blue-100 px-4 shadow">
                <div className="flex items-center justify-start gap-2">
                  <p className="font-semibold">Your Linkbud is live: </p>
                  <a href="/" target="_blank" className="underline">
                    link.bud/hansenlimanta
                  </a>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <p>Share your Linktree to your socials</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "http://www.hansenlimanta.com",
                      );
                    }}
                    className="rounded-full border bg-white px-4 py-2 font-semibold hover:bg-slate-100"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            </div>
            <div className="m-auto flex min-h-screen max-w-[620px] flex-auto flex-col items-center justify-start gap-4 py-14">
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
                    onSubmit={handleSubmitUrl}
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
              <Droppable droppableId={"drop-area"}>
                {(provided) => (
                  <div
                    className="flex w-full flex-col"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {links.map((link, index) => {
                      if (link.type === LinkType.Header) {
                        return (
                          <DraggableHeader
                            key={link.id}
                            link={link}
                            index={index}
                          />
                        );
                      } else {
                        return (
                          <DraggableLink
                            key={link.id}
                            link={link}
                            index={index}
                          />
                        );
                      }
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          <div className="fixed right-0 top-0 z-10 h-screen w-[570px] border-l">
            <iframe
              src="http://localhost:3000/linkbud"
              className="absolute left-1/2 top-1/2 h-[690px] w-[320px] -translate-x-1/2 -translate-y-1/2 scale-[0.7] overflow-hidden rounded-[40px] border-[10px] border-black bg-gray-800"
            ></iframe>
          </div>
        </DragDropContext>
      </main>
    </>
  );
}
