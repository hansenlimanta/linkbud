import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

import AdminNav from "~/components/AdminNav";
import Backgrounds from "~/components/appearancePage/Backgrounds";
import Buttons from "~/components/appearancePage/Buttons";
import Fonts from "~/components/appearancePage/Fonts";
import Profile from "~/components/appearancePage/Profile";
import Themes from "~/components/appearancePage/Themes";
import Preview from "~/components/adminPage/Preview";
import Meta from "~/components/Meta";
import { Theme, User } from "@prisma/client";

export default function Admin() {
  const { data: sessionData, status: authStatus } = useSession();
  const { data: dbLinks } = api.links.getLinksById.useQuery();
  const { data: userData } = api.user.getUserAndTheme.useQuery();

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
        <div className="!ml-0 mr-[570px] flex flex-col items-center justify-center overflow-x-auto py-24">
          <Profile
            description={sessionData.user.description}
            pageTitle={sessionData.user.pageTitle}
            profile={sessionData.user.image}
          />
          <Themes />
          <div className="relative mt-4 flex flex-col items-center justify-center p-6">
            <div className="absolute flex h-full w-full flex-col items-center justify-evenly rounded-2xl bg-slate-300/50 text-2xl font-bold uppercase">
              <p>under development</p>
              <p>under development</p>
              <p>under development</p>
            </div>
            <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
              <p className="text-xl font-semibold">Custom appearance</p>
              <p>
                Completely customize your Linktree profile. Change your
                background with colors, gradients and images. Choose a button
                style, change the typeface and more.
              </p>
            </div>
            <Backgrounds />
            <Buttons />
            <Fonts />
          </div>
        </div>
        <Preview
          links={dbLinks ?? []}
          theme={userData?.theme ?? ({} as Theme)}
          user={userData?.user ?? ({} as User)}
        />
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
