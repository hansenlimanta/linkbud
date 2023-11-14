import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import AdminNav from "~/components/AdminNav";
import { getServerAuthSession } from "~/server/auth";

export default function Admin() {
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
            src="http://localhost:3000/linkbud"
            className="absolute left-1/2 top-1/2 h-[690px] w-[320px] -translate-x-1/2 -translate-y-1/2 scale-[0.7] overflow-hidden rounded-[40px] border-[10px] border-black bg-gray-800"
          ></iframe>
        </div>
      </main>
    </>
  );
}

function Profile() {
  return (
    <div className="flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Profile</p>
      <div className="flex flex-col gap-8 rounded-2xl bg-white p-6">
        <div className="flex w-full items-center justify-start gap-4">
          <div className="flex items-center justify-center p-1">
            <div className="h-20 w-20 rounded-full bg-red-400" />
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
        <form className="flex w-full flex-col gap-4">
          <input type="text" className="rounded-lg border" />
          <textarea className="rounded-lg border"></textarea>
        </form>
      </div>
    </div>
  );
}

function Themes() {
  const data = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Themes</p>
      <div className="inline-grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 rounded-2xl bg-white p-6">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="flex h-fit w-full flex-col items-center justify-start"
            >
              <div className="h-[200px] w-full cursor-pointer rounded-lg border"></div>
              <p className="py-3">Custom</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Backgrounds() {
  const data = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Backgrounds</p>
      <div className="rounded-2xl bg-white p-6">
        <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-fit w-full flex-col items-center justify-start"
              >
                <div className="h-[200px] w-full cursor-pointer rounded-lg border"></div>
                <p className="py-3">Custom</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="font-semibold">Color</p>
          <div className="flex items-center justify-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-300" />
            <div className="flex h-12 w-40 flex-col items-start justify-center rounded-lg bg-gray-300 px-4">
              <p className="text-sm text-gray-500">Color</p>
              <p>#ffffff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Buttons() {
  const data = [0, 1, 2];
  return (
    <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Buttons</p>
      <div className="flex flex-col gap-2 rounded-2xl bg-white p-6">
        <p>Fill</p>
        <div className="inline-grid w-full grid-cols-2 gap-4 md:grid-cols-3">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-fit w-full flex-col items-center justify-start"
              >
                <div className="h-9 w-full cursor-pointer rounded-lg border"></div>
              </div>
            );
          })}
        </div>
        <p>Outline</p>
        <div className="inline-grid w-full grid-cols-2 gap-4 md:grid-cols-3">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-fit w-full flex-col items-center justify-start"
              >
                <div className="h-9 w-full cursor-pointer rounded-lg border"></div>
              </div>
            );
          })}
        </div>
        <p>Soft shadow</p>
        <div className="inline-grid w-full grid-cols-2 gap-4 md:grid-cols-3">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-fit w-full flex-col items-center justify-start"
              >
                <div className="h-9 w-full cursor-pointer rounded-lg border"></div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="font-semibold">Button color</p>
          <div className="flex items-center justify-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-300" />
            <div className="flex h-12 w-40 flex-col items-start justify-center rounded-lg bg-gray-300 px-4">
              <p className="text-sm text-gray-500">Color</p>
              <p>#ffffff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fonts() {
  const data = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Fonts</p>
      <div className="rounded-2xl bg-white p-6">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Font</p>
          <div className="flex h-20 w-full cursor-pointer items-center justify-start gap-4 rounded-xl border-2 hover:bg-slate-300"></div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="font-semibold">Color</p>
          <div className="flex items-center justify-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-300" />
            <div className="flex h-12 w-40 flex-col items-start justify-center rounded-lg bg-gray-300 px-4">
              <p className="text-sm text-gray-500">Color</p>
              <p>#ffffff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
