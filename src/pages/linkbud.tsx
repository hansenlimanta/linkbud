// page to show linkbud page. it will be like the linktree page

import Head from "next/head";
import { useEffect, useState } from "react";
import Background from "~/components/Background";
import LinkButton from "~/components/LinkButton";
import { useUserStore } from "~/store/userStore";
export default function Linkbud() {
  const links = useUserStore((state) => state.links);
  const [profilePicture, setProfilePicture] = useState("");
  useEffect(() => {
    getProfilePicture();
  }, []);

  async function getProfilePicture() {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        setProfilePicture(data.results[0].picture.large);
      });
  }

  return (
    <>
      <Head>
        <title>Linkbud</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen w-full">
        <div className="flex flex-col items-center justify-start gap-2 px-8 py-20 text-white sm:mx-auto sm:w-96">
          <Background theme="black" />
          <img
            className="h-20 rounded-full"
            src={profilePicture}
            alt="profile picture"
          />
          <h1 className="text-xl font-semibold">Hansen Limanta</h1>
          <h2 className="text-center">
            Description Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Eveniet, quas?
          </h2>
          <div className="my-4 flex w-full flex-col gap-4">
            {links.map((link) => (
              <LinkButton
                key={link.id}
                name={link.name}
                theme="white"
                url={link.url}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
