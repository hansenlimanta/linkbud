import { FC } from "react";
import { Link } from "@prisma/client";

type LinkHeaderProps = {
  theme: string;
  link: Link;
  index: number;
};

const LinkHeader: FC<LinkHeaderProps> = ({ theme, link, index }) => {
  const classWrapper =
    index === 0 ? "w-full py-0 text-center" : "w-full pb-0 pt-4 text-center";

  switch (theme) {
    case "white":
      return (
        <div key={link.id} className={classWrapper}>
          <h1 className="text-1xl font-semibold text-black">{link.title}</h1>
        </div>
      );
    case "black":
      return (
        <div key={link.id} className={classWrapper}>
          <h1 className="text-1xl font-semibold text-white">{link.title}</h1>
        </div>
      );
    case "warburton":
      return (
        <div key={link.id} className={classWrapper}>
          <h1 className="text-1xl font-bold text-blue-900">{link.title}</h1>
        </div>
      );

    default:
      return (
        <div key={link.id} className={classWrapper}>
          <h1 className="text-1xl font-semibold text-black">{link.title}</h1>
        </div>
      );
  }
};

export default LinkHeader;
