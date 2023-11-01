import Head from "next/head";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
// import { signIn, signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";

type Task = {
  id: string;
  content: string;
  url: string;
};

export default function Admin() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [isAddUrl, setIsAddUrl] = useState(false);

  useEffect(() => {
    const initialTask: Task[] = [
      {
        id: "task-1",
        content: "Take out the garbage",
        url: "https://www.hansenlimanta.com",
      },
      {
        id: "task-2",
        content: "Watch my favorite show",
        url: "https://www.hansenlimanta.com",
      },
      {
        id: "task-3",
        content: "Charge my phone",
        url: "https://www.hansenlimanta.com",
      },
      {
        id: "task-4",
        content: "Cook dinner",
        url: "https://www.hansenlimanta.com",
      },
    ];
    const initialOrder: string[] = ["task-1", "task-2", "task-3", "task-4"];
    setTasks([...initialTask]);
    setOrder([...initialOrder]);
  }, []);
  const onDragEnd = (result: DropResult) => {
    console.log("order", order);
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newOrder = [...order];
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);

    const newTasks: Task[] = newOrder.map((taskId: string) => {
      return tasks.find((task) => task.id === taskId) as Task;
    });
    setOrder([...newOrder]);
    setTasks([...newTasks]);
  };

  return (
    <>
      <Head>
        <title>Linkbud Admin</title>
        <meta name="description" content="linkbud admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-stone-100">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="!ml-0 mr-[570px] overflow-x-auto">
            <div className="m-auto flex min-h-screen max-w-[600px] flex-auto flex-col items-center justify-start gap-4 py-16">
              {isAddUrl ? (
                <div
                  onClick={() => setIsAddUrl(false)}
                  className="flex w-full flex-col justify-center rounded-xl border bg-white p-6 pt-4 align-baseline transition-all ease-in-out"
                >
                  <div className="flex w-full justify-end">
                    <p className="m-0 h-6 w-6 cursor-pointer rounded-full p-0 text-center text-black transition-all hover:bg-slate-100">
                      x
                    </p>
                  </div>
                  <h2 className="mb-4 text-xl font-bold">Enter URL</h2>
                  <div className="flex w-full justify-between gap-4">
                    <input
                      type="text"
                      placeholder="URL"
                      className="w-full rounded-lg border bg-stone-100 px-4 py-2"
                    />
                    <button
                      onClick={() => setIsAddUrl(false)}
                      className="rounded-full border bg-stone-50 px-5 py-2 transition-all hover:bg-stone-200"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddUrl(true)}
                  className="w-full rounded-full bg-amber-200 px-4 py-2 font-semibold transition-all ease-in-out hover:bg-amber-300"
                >
                  + Add Link
                </button>
              )}
              <div className="w-full">
                <button className="rounded-full border-2 bg-inherit px-4 py-2 hover:bg-white">
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
                    {tasks.map((task, index) => (
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
                                ||
                              </div>
                              <div className="flex w-full flex-col py-4">
                                <input
                                  type="text"
                                  value={task.content}
                                  className="w-fit cursor-pointer font-medium focus:cursor-text focus:border-none"
                                />
                                <input
                                  type="text"
                                  value={task.url}
                                  className="cursor-pointer focus:cursor-text focus:border-none"
                                />
                              </div>
                              <div className="gap2 flex flex-col items-center justify-center px-2 py-4">
                                <Switch.Root className="group relative h-6 w-10 rounded-full bg-gray-500 aria-checked:bg-green-700">
                                  <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform will-change-transform group-aria-checked:translate-x-[18px]" />
                                </Switch.Root>
                                <button
                                  onClick={() => setIsAddUrl(false)}
                                  className="rounded-full bg-inherit p-2 text-sm text-red-300 transition-all hover:bg-stone-100 hover:text-red-600"
                                >
                                  Del
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
              <div className="h-[5000px] w-full bg-green-400"></div>
            </div>
          </div>
          <div className="fixed right-0 top-0 z-10 h-screen w-[570px] border-l">
            <iframe
              src="http://localhost:3000/linkbud"
              className="absolute left-1/2 top-1/2 h-[690px] w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[40px] border-[10px] border-black bg-gray-800"
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
