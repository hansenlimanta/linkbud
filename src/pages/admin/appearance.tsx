import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

import Head from "next/head";
import AdminNav from "~/components/AdminNav";
import Backgrounds from "~/components/appearancePage/Backgrounds";
import Buttons from "~/components/appearancePage/Buttons";
import Fonts from "~/components/appearancePage/Fonts";
import Profile from "~/components/appearancePage/Profile";
import Themes from "~/components/appearancePage/Themes";

export default function Admin() {
  const { data: sessionData } = useSession();
  const [userUrl, setUserUrl] = useState("");
  const updatePageTitleApi = api.user.updatePageTitle.useMutation();

  useEffect(() => {
    if (sessionData?.user.username) {
      setUserUrl(`http://localhost:3000/${sessionData.user.username}`);
    }
  }, [sessionData]);
  useEffect(() => {
    const timeOutId = setTimeout(
      () => updatePageTitleApi.mutate({ pageTitle: "Linkbud Admin" }),
      2000,
    );
    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <>
      <Head>
        <title>Linkbud Admin</title>
        <meta name="description" content="linkbud admin" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="min-h-screen bg-stone-100">
        <AdminNav />
        <div className="!ml-0 mr-[570px] flex flex-col items-center justify-center overflow-x-auto py-24">
          <Profile />
          <Themes />
          <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
            <p className="text-xl font-semibold">Custom appearance</p>
            <p>
              Completely customize your Linktree profile. Change your background
              with colors, gradients and images. Choose a button style, change
              the typeface and more.
            </p>
          </div>
          <Backgrounds />
          <Buttons />
          <Fonts />
        </div>
        <div className="fixed right-0 top-0 z-10 h-screen w-[570px] border-l">
          <iframe
            src={userUrl}
            className="absolute left-1/2 top-1/2 h-[690px] w-[320px] -translate-x-1/2 -translate-y-1/2 scale-[0.7] overflow-hidden rounded-[40px] border-[10px] border-black bg-gray-800"
          ></iframe>
        </div>
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
