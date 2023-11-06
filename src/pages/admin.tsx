import Head from "next/head";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
// import { signIn, signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import { api } from "~/utils/api";
import { FiTrash2 } from "react-icons/fi";
import { PiDotsSixVerticalLight } from "react-icons/pi";
import { RiLayoutTop2Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import AdminNav from "~/components/AdminNav";
import { Link, useUserStore } from "~/store/userStore";

export default function Admin() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const addLink = useUserStore((state) => state.addLink);
  const [inputUrl, setInputUrl] = useState("");
  const [isAddUrl, setIsAddUrl] = useState(false);
  const links = useUserStore((state) => state.links);
  const updateOrders = useUserStore((state) => state.updateOrders);
  const handleSubmitUrl = () => {
    const newLink: Link = {
      id: Math.floor(Math.random() * 100000000).toString(),
      name: "Test",
      url: inputUrl,
    };
    console.log(newLink);

    addLink(newLink);
    setInputUrl("");
    setIsAddUrl(false);
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
                <div className="flex w-full flex-col justify-center rounded-xl border bg-white p-6 pt-4 align-baseline transition-all ease-in-out">
                  <div className="flex w-full justify-end">
                    <p className="m-0 h-6 w-6 cursor-pointer rounded-full p-0 text-center text-black transition-all hover:bg-slate-100">
                      x
                    </p>
                  </div>
                  <h2 className="mb-4 text-xl font-bold">Enter URL</h2>
                  <div className="flex w-full justify-between gap-4">
                    <input
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      type="text"
                      placeholder="URL"
                      className="w-full rounded-lg border bg-stone-100 px-4 py-2"
                    />
                    <button
                      onClick={handleSubmitUrl}
                      className="rounded-full border bg-stone-50 px-5 py-2 transition-all hover:bg-stone-200"
                    >
                      Add
                    </button>
                  </div>
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
                <button className="flex items-center justify-center gap-2 rounded-full border-2 bg-inherit px-4 py-2 hover:bg-white">
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
                    {links.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id!}
                        index={index}
                        isDragDisabled={false}
                      >
                        {(provided) => (
                          <div
                            className="py-2"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className="flex w-full gap-2 rounded-2xl bg-white">
                              <div
                                className="flex w-8 flex-col items-center justify-center py-4 text-center"
                                {...provided.dragHandleProps}
                              >
                                <PiDotsSixVerticalLight size={20} />
                              </div>
                              <div className="flex w-full flex-col py-4">
                                <input
                                  defaultValue={task.name}
                                  type="text"
                                  className="w-fit cursor-pointer font-medium focus:cursor-text focus:border-none"
                                />
                                <GoPencil />
                                <input
                                  defaultValue={task.url}
                                  type="text"
                                  className="cursor-pointer focus:cursor-text focus:border-none"
                                />
                              </div>
                              <div className="flex flex-col items-center justify-center gap-2 px-2 py-4">
                                <Switch.Root className="group relative h-6 w-10 rounded-full bg-gray-500 aria-checked:bg-green-700">
                                  <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform will-change-transform group-aria-checked:translate-x-[18px]" />
                                </Switch.Root>
                                <button
                                  onClick={() => setIsAddUrl(false)}
                                  className="rounded-full bg-inherit p-2 text-sm text-red-300 transition-all hover:bg-stone-100 hover:text-red-600"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
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
      {/* <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <Link
              href="/linkbud"
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <div>Go to Linkbud</div>
            </Link>
            <AuthShowcase />
          </div>
        </div>
      </main> */}
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
