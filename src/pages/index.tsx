import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Meta from "~/components/Meta";
import Link from "next/link";
import { PiTreePalmFill } from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Meta />
      <main className="min-h-screen w-full bg-stone-100">
        <nav className="fixed top-0 z-20 m-auto w-full">
          <div className="mx-36 mt-8 flex max-w-[1728px] items-center justify-between rounded-full bg-white px-4 py-2">
            <div className="flex items-center justify-start gap-2">
              <div className="mx-4 cursor-pointer font-bold">
                <PiTreePalmFill size={40} />
              </div>
              <p className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
                Templates
              </p>
              <p className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
                Marketplace
              </p>
              <p className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
                Discover
              </p>
              <p className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
                Pricing
              </p>
              <p className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 font-semibold text-gray-700 hover:bg-slate-100">
                Learn
              </p>
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
        <div className="flex h-screen w-full px-36 py-20 text-slate-900">
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
                className="rounded-md border p-4"
                type="text"
                placeholder="linkbud.com/yourname"
              />
              <button className="rounded-full bg-green-300 px-8 py-4 font-medium text-slate-900 transition hover:bg-green-400">
                Claim your Linkbud
              </button>
            </div>
          </div>
          <Carousel
            opts={{ loop: true }}
            className="flex flex-1 items-center justify-center"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent className="h-screen w-[500px] px-4">
              <CarouselItem className="relative m-auto h-2/3 w-[350px] rounded-lg">
                <Image
                  src="/sugden-theme.svg"
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-2xl"
                  alt="linkbud"
                  fill
                />
              </CarouselItem>
              <CarouselItem className="relative m-auto h-2/3 w-[350px] rounded-lg">
                <Image
                  src="/merlin-theme.svg"
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-2xl"
                  alt="linkbud"
                  fill
                />
              </CarouselItem>
              <CarouselItem className="relative m-auto h-2/3 w-[350px] rounded-lg">
                <Image
                  src="/warburton-theme.svg"
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-2xl"
                  alt="linkbud"
                  fill
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </main>
    </>
  );
}
