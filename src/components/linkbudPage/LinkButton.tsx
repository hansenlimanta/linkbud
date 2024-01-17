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
          <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 text-black duration-150 ease-in-out hover:bg-transparent hover:text-white">
            <p className="text-center">{link.title}</p>
          </div>
        </a>
      );
    case "black":
      return (
        <a key={link.id} href={link.url} target="_blank">
          <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black bg-black py-3 text-white duration-150 ease-in-out hover:bg-transparent hover:text-black">
            <p className="text-center">{link.title}</p>
          </div>
        </a>
      );
    case "warburton":
      return (
        <a key={link.id} href={link.url} target="_blank">
          <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-blue-900 bg-transparent py-3 font-medium text-blue-900 duration-150 ease-in-out hover:bg-blue-900 hover:text-white">
            <p className="text-center">{link.title}</p>
          </div>
        </a>
      );
    case "ulster":
      return (
        <div className="relative w-full">
          <div className="absolute w-full translate-x-1 translate-y-1 cursor-auto rounded-lg border-2 border-white bg-white py-3 font-medium text-white">
            <p className="text-center">{link.title}</p>
          </div>
          <a key={link.id} href={link.url} target="_blank">
            <div className="flex w-full -translate-x-1 -translate-y-1 cursor-pointer items-center justify-center rounded-lg border-2 border-white bg-orange-700 py-3 font-medium text-white duration-150 ease-in-out hover:translate-x-0 hover:translate-y-0">
              <p className="text-center">{link.title}</p>
            </div>
          </a>
        </div>
      );
    case "sugden":
      return (
        <a key={link.id} href={link.url} target="_blank">
          <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-slate-800 bg-slate-800 py-3 font-medium text-white duration-150 ease-in-out hover:bg-transparent hover:text-slate-800">
            <p className="text-center">{link.title}</p>
          </div>
        </a>
      );

    default:
      return (
        <a key={link.id} href={link.url} target="_blank">
          <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 text-black duration-150 ease-in-out hover:bg-transparent hover:text-white">
            <p className="text-center">{link.title}</p>
          </div>
        </a>
      );
  }
};

export default LinkButton;
