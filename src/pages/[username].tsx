import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LinkType } from "~/store/linksStore";
import { api } from "~/utils/api";
import { Poppins } from "next/font/google";

import Background from "~/components/linkbudPage/Background";
import LinkButton from "~/components/linkbudPage/LinkButton";
import LinkHeader from "~/components/linkbudPage/LinkHeader";
import PageTitle from "~/components/linkbudPage/PageTitle";
import Meta from "~/components/Meta";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Linkbud() {
  const router = useRouter();
  const [error, setError] = useState("");
  const userQuery = api.links.getLinksByUsername.useQuery({
    username: router.query.username as string,
  });
  const { data: userData } = userQuery;
  const [profilePicture, setProfilePicture] = useState("");
  useEffect(() => {
    if (userQuery.error?.data?.code) {
      setError(userQuery.error.message);
    }
  }, [userQuery.error?.data?.code]);
  useEffect(() => {
    if (userData?.user.image) {
      setProfilePicture(userData.user.image);
    }
  }, [userData?.user.image]);

  if (error !== "") {
    return (
      <>
        <Meta />
        <main className={poppins.className}>
          <div className="min-h-screen w-full">{error}</div>
        </main>
      </>
    );
  }

  if (userQuery.isLoading || !userData) {
    return (
      <>
        <Meta />
        <main className={poppins.className}>
          <p className="flex h-screen w-screen animate-pulse items-center justify-center">
            Loading...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Meta />
      <main className={poppins.className}>
        <div className="flex min-h-screen w-full flex-col items-center justify-start gap-2 px-8 py-20 text-white sm:mx-auto sm:w-96">
          <Background
            theme={userData.theme?.buttonStyle || "DEFAULT"}
            image={profilePicture}
          />
          <img
            className="h-20 rounded-full"
            src={profilePicture}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
          <PageTitle
            theme={userData.theme?.key || "DEFAULT"}
            userData={userData.user}
          />
          <div className="my-4 flex w-full flex-col gap-4">
            {userData.links ? (
              userData.links.map((dbLink, index) => {
                if (dbLink.isActive === false) {
                  return <></>;
                } else if (dbLink.type === LinkType.Classic) {
                  return (
                    <LinkButton
                      key={dbLink.id}
                      theme={userData.theme?.buttonStyle || "DEFAULT"}
                      link={dbLink}
                    />
                  );
                } else if (dbLink.type === LinkType.Header) {
                  return (
                    <LinkHeader
                      key={dbLink.id}
                      theme={userData.theme?.buttonStyle || "DEFAULT"}
                      link={dbLink}
                      index={index}
                    />
                  );
                }
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
