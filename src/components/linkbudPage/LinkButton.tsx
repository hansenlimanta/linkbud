import { FC } from "react";
import { Link } from "@prisma/client";

type LinkButtonProps = {
  theme: string;
  link: Link;
};

const LinkButton: FC<LinkButtonProps> = ({ theme, link }) => {
  switch (theme) {
    case "white":
      return (
        <a key={link.id} href={link.url} target="_blank">
          <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 text-black duration-150 ease-in-out hover:bg-transparent hover:text-white">
            <p className="text-center">{link.title}</p>
          </div>
        </a>
      );
    case "black":
      return (
        <a key={link.id} href={link.url} target="_blank">
          <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black bg-black py-3 text-white duration-150 ease-in-out hover:bg-transparent hover:text-black">
            <p className="text-center">{link.title}</p>
          </div>
        </a>
      );

    default:
      return (
        <a key={link.id} href={link.url} target="_blank">
          <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 text-black duration-150 ease-in-out hover:bg-transparent hover:text-white">
            <p className="text-center">{link.title}</p>
          </div>
        </a>
      );
  }
};

export default LinkButton;
