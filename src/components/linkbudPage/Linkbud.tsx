import { FC } from "react";
import Background from "./Background";
import PageTitle from "./PageTitle";
import LinkButton from "./LinkButton";
import { Link, Theme, User } from "@prisma/client";
import { LinkType } from "~/store/linksStore";
import LinkHeader from "./LinkHeader";

type LinkbudProps = {
  user: User;
  theme: Theme;
  links: Link[];
};

const Linkbud: FC<LinkbudProps> = ({ links, theme, user }) => {
  return (
    <div className="max-w-96 flex min-h-full w-full flex-col items-center justify-start gap-2 overflow-y-auto px-8 py-20 text-white sm:mx-auto sm:max-w-[680px] ">
      <Background theme={theme?.key || "DEFAULT"} image={user.image ?? ""} />
      <img
        className="h-20 rounded-full"
        src={user.image ?? ""}
        alt="profile picture"
        referrerPolicy="no-referrer"
      />
      <PageTitle theme={theme?.key || "DEFAULT"} userData={user} />
      <div className="my-4 flex w-full flex-col gap-4">
        {links && user.linkOrder ? (
          user.linkOrder.split(",").map((id, index) => {
            const dbLink = links.find((link) => link.id === id) ?? ({} as Link);
            if (dbLink.isActive === false) {
              return <></>;
            } else if (dbLink.type === "CLASSIC") {
              return (
                <LinkButton
                  key={dbLink.id}
                  theme={theme?.key || "DEFAULT"}
                  link={dbLink}
                />
              );
            } else if (dbLink.type === "HEADER") {
              return (
                <LinkHeader
                  key={dbLink.id}
                  theme={theme?.key || "DEFAULT"}
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
  );
};

export default Linkbud;
