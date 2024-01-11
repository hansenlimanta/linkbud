import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import AdminNav from "~/components/AdminNav";
import DraggableLink from "~/components/adminPage/DraggableLink";
import DraggableHeader from "~/components/adminPage/DraggableHeader";
import { LinkType, useLinksStore } from "~/store/linksStore";
import { Link, Theme, User } from "@prisma/client";
import { api } from "~/utils/api";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import AddUrlForm from "~/components/adminPage/AddUrlForm";
import { useSession } from "next-auth/react";
import Preview from "~/components/adminPage/Preview";
import Meta from "~/components/Meta";

export default function Admin() {
  const utils = api.useContext();
  const { data: sessionData, status: authStatus } = useSession();
  const { data: dbLinks } = api.links.getLinksById.useQuery();
  const { data: userData } = api.user.getUserAndTheme.useQuery();
  const updateLinkOrder = api.links.updateLinkOrder.useMutation({
    onSuccess: () => {
      utils.links.getLinksById.invalidate();
      utils.user.getUserAndTheme.invalidate();
    },
    onError: () => {
      utils.links.getLinksById.invalidate();
    },
  });

  const links = useLinksStore((state) => state.links);
  const orderDbFormat = useLinksStore((state) => state.orderDbFormat);
  const setInitialLinks = useLinksStore(
    (state) => state.setInitialLinksAndOrder,
  );
  const updateOrders = useLinksStore((state) => state.updateOrders);

  const [userUrl, setUserUrl] = useState("");
  const [isInitialStateSet, setIsInitialStateSet] = useState(0);

  useEffect(() => {
    if (isInitialStateSet > 0) return;
    let initialOrder: string[] = [];
    let initialLinks: Link[] = [];
    if (sessionData?.user.linkOrder) {
      initialOrder = sessionData.user.linkOrder.split(",");
      if (dbLinks) {
        initialLinks = initialOrder.map((id) => {
          return dbLinks.find((link) => link.id === id);
        }) as Link[];
        setIsInitialStateSet(1);
      }
    }
    setInitialLinks(initialLinks, initialOrder);
  }, [dbLinks, sessionData?.user.linkOrder]);

  useEffect(() => {
    if (sessionData?.user.username) {
      setUserUrl(`http://localhost:3000/${sessionData.user.username}`);
    }
  }, [sessionData]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (!orderDbFormat) return;
      updateLinkOrder.mutate({ order: orderDbFormat });
    }, 2000);
    return () => clearTimeout(timeOutId);
  }, [orderDbFormat]);

  if (authStatus === "loading" || sessionData === null) {
    return (
      <>
        <Meta />
        <p className="flex h-screen w-screen animate-pulse items-center justify-center">
          Loading...
        </p>
      </>
    );
  }

  return (
    <>
      <Meta />
      <main className="min-h-screen bg-stone-100">
        <AdminNav />
        <DragDropContext onDragEnd={(e) => updateOrders(e)}>
          <div className="!ml-0 mr-[570px] overflow-x-auto">
            <div className="mt-20 w-full px-6">
              <div className="flex h-20 w-full items-center justify-between rounded-3xl bg-blue-100 px-4 shadow">
                <div className="flex items-center justify-start gap-2">
                  <p className="font-semibold">Your Linkbud is live: </p>
                  <a href={userUrl} target="_blank" className="underline">
                    {userUrl}
                  </a>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <p>Share your Linktree to your socials</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(userUrl);
                    }}
                    className="rounded-full border bg-white px-4 py-2 font-semibold hover:bg-slate-100"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            </div>
            <div className="m-auto flex min-h-screen max-w-[620px] flex-auto flex-col items-center justify-start gap-4 py-14">
              <AddUrlForm />
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
          <Preview
            links={dbLinks ?? []}
            theme={userData?.theme ?? ({} as Theme)}
            user={userData?.user ?? ({} as User)}
          />
        </DragDropContext>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (!session.user.username) {
    return {
      redirect: {
        destination: "/admin/register-username",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
