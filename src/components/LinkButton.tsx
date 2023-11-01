import { FC, useEffect, useState } from "react";

type LinkButtonProps = {
  theme: string;
  url: string;
  name: string;
};

const LinkButton: FC<LinkButtonProps> = ({ theme, name, url }) => {
  switch (theme) {
    case "white":
      return (
        <a href={url} target="_blank">
          <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 text-black duration-150 ease-in-out hover:bg-transparent hover:text-white">
            <p className="text-center">{name}</p>
          </div>
        </a>
      );
    case "black":
      return (
        <a href={url} target="_blank">
          <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black bg-black py-3 text-white duration-150 ease-in-out hover:bg-transparent hover:text-black">
            <p className="text-center">{name}</p>
          </div>
        </a>
      );

    default:
      return (
        <a href={url} target="_blank">
          <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 text-black duration-150 ease-in-out hover:bg-transparent hover:text-white">
            <p className="text-center">{name}</p>
          </div>
        </a>
      );
  }
};

export default LinkButton;
