import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import AdminNav from "~/components/AdminNav";
import DraggableLink from "~/components/DraggableLink";
import DraggableHeader from "~/components/DraggableHeader";
import { LinkType, useLinksStore } from "~/store/linksStore";
import { Link } from "@prisma/client";
import { api } from "~/utils/api";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import AddUrlForm from "~/components/AddUrlForm";
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: sessionData } = useSession();
  const { data: dbLinks } = api.links.getLinksById.useQuery();
  const updateLinksArray = api.links.updateLinksArray.useMutation();

  const links = useLinksStore((state) => state.links);
  const updateOrderParams = useLinksStore((state) => state.updateOrderParams);
  const setInitialLinks = useLinksStore((state) => state.setInitialLinks);
  const updateOrders = useLinksStore((state) => state.updateOrders);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [userUrl, setUserUrl] = useState("");

  useEffect(() => {
    const initialLinks = dbLinks
      ? dbLinks.map(
          (link) =>
            ({
              id: link.id,
              isActive: link.isActive,
              title: link.title,
              type: link.type,
              url: link.url,
              position: link.position,
              userId: link.userId,
            }) as Link,
        )
      : ([] as Link[]);
    setInitialLinks(initialLinks);
  }, [dbLinks]);

  useEffect(() => {
    iframeRef.current?.contentWindow?.location.reload();
  }, [links]);

  useEffect(() => {
    if (sessionData?.user.username) {
      setUserUrl(`http://localhost:3000/${sessionData.user.username}`);
    }
  }, [sessionData]);

  // belum bisa karena masih pake sqlite
  useEffect(() => {
    if (!updateOrderParams) return;
    const updateOrderData = links.map((link) => ({
      id: link.id,
      isActive: link.isActive,
      position: link.position,
      title: link.title,
      url: link.url,
    }));
    updateLinksArray.mutate(updateOrderData);
    iframeRef.current?.contentWindow?.location.reload();
  }, [updateOrderParams]);

  return (
    <>
      <Head>
        <title>Linkbud Admin</title>
        <meta name="description" content="linkbud admin" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
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
          <div className="fixed right-0 top-0 z-10 h-screen w-[570px] border-l">
            {userUrl === "" ? (
              <></>
            ) : (
              <iframe
                src={userUrl}
                ref={iframeRef}
                className="absolute left-1/2 top-1/2 h-[690px] w-[320px] -translate-x-1/2 -translate-y-1/2 scale-[0.7] overflow-hidden rounded-[40px] border-[10px] border-black bg-gray-800"
              ></iframe>
            )}
          </div>
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
