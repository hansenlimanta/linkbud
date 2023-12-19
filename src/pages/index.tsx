import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Meta from "~/components/Meta";
import Link from "next/link";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Meta />
      <main className="min-h-screen w-full bg-stone-100">
        <nav className="fixed top-0 z-20 m-auto w-full">
          <div className="mx-36 mt-12 flex max-w-[1728px] items-center justify-between rounded-full bg-white px-8 py-4">
            <div className="flex items-center justify-start gap-6">
              <p className="cursor-pointer px-4 text-3xl font-bold">Linkbud</p>
              <p>Templates</p>
              <p>Marketplace</p>
              <p>Discover</p>
              <p>Pricing</p>
              <p>Learn</p>
            </div>
            <div>
              {sessionData ? (
                <div className="flex items-center justify-center gap-4">
                  <Link href="/admin">
                    <button className="rounded-xl bg-slate-200 px-8 py-3 font-medium text-black transition hover:bg-slate-300">
                      Admin
                    </button>
                  </Link>
                  <button
                    className="rounded-full bg-slate-800 px-8 py-3 font-medium text-white transition hover:bg-slate-700"
                    onClick={() => void signOut()}
                  >
                    logout
                  </button>
                </div>
              ) : (
                <button
                  className="rounded-full bg-slate-800 px-8 py-3 font-medium text-white transition hover:bg-slate-700"
                  onClick={() =>
                    void signIn("google", { callbackUrl: "/admin" })
                  }
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>
        <div className="flex h-screen w-full bg-green-900 px-36 text-yellow-400">
          <div className="flex flex-1 flex-col items-start justify-center gap-6">
            <h1 className="text-7xl font-extrabold">
              Everything you are. In one, simple link in bio.
            </h1>
            <h2 className="text-lg font-medium">
              Join 40M+ people using Linktree for their link in bio. One link to
              help you share everything you create, curate and sell from your
              Instagram, TikTok, Twitter, YouTube and other social media
              profiles.
            </h2>
            <div className="flex gap-3">
              <input
                className="rounded-md p-4"
                type="text"
                placeholder="link.bud/yourname"
              />
              <button className="rounded-full bg-pink-300 px-8 py-4 font-medium text-black transition hover:bg-pink-400">
                Claim your Linkbud
              </button>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative h-[600px] w-[350px] rounded-lg">
              <Image
                src="/linkbud.svg"
                layout="fill"
                objectFit="contain"
                alt="linkbud"
                className="animate-pulse"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
