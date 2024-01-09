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
import { Link } from "@prisma/client";
import Linkbud from "~/components/linkbudPage/Linkbud";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function LinkbudUserView() {
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
      <Meta title={userData.user.name ?? "Linkbud"} />
      <main className={poppins.className}>
        <Linkbud
          links={userData.links}
          theme={userData.theme}
          user={userData.user}
        />
      </main>
    </>
  );
}
