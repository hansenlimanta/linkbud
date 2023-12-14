import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Meta from "~/components/Meta";

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
                <button
                  className="rounded-full bg-pink-300 px-8 py-4 font-medium transition hover:bg-pink-400"
                  onClick={() => void signOut()}
                >
                  logout
                </button>
              ) : (
                <button
                  className="rounded-full bg-pink-300 px-8 py-4 font-medium transition hover:bg-pink-400"
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
        <div className="flex h-screen w-full bg-lime-600 px-36">
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
              <button className="rounded-full bg-pink-300 px-8 py-4 font-medium transition hover:bg-pink-400">
                Claim your Linkbud
              </button>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative h-[600px] w-[350px] rounded-lg">
              <Image
                alt="example"
                src="/linkbud-example.png"
                className="object-cover"
                fill
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
