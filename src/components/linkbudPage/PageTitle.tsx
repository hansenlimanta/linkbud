import { FC } from "react";
import { User } from "@prisma/client";

type PageTitleProps = {
  theme: string;
  userData: User;
};

const PageTitle: FC<PageTitleProps> = ({ theme, userData }) => {
  switch (theme) {
    case "white":
      return (
        <>
          <h1 className="text-xl font-bold text-black">{userData.pageTitle}</h1>
          {userData.description ? (
            <h2 className="text-center text-black">{userData.description}</h2>
          ) : (
            <></>
          )}
        </>
      );
    case "black":
      return (
        <>
          <h1 className="text-xl font-bold text-white">{userData.pageTitle}</h1>
          {userData.description ? (
            <h2 className="text-center text-white">{userData.description}</h2>
          ) : (
            <></>
          )}
        </>
      );
    case "warburton":
      return (
        <>
          <h1 className="text-xl font-bold text-blue-900">
            {userData.pageTitle}
          </h1>
          {userData.description ? (
            <h2 className="text-center text-blue-900">
              {userData.description}
            </h2>
          ) : (
            <></>
          )}
        </>
      );
    case "ulster":
      return (
        <>
          <h1 className="text-xl font-bold text-white">{userData.pageTitle}</h1>
          {userData.description ? (
            <h2 className="text-center text-white">{userData.description}</h2>
          ) : (
            <></>
          )}
        </>
      );
    case "sugden":
      return (
        <>
          <h1 className="text-xl font-bold text-slate-800">
            {userData.pageTitle}
          </h1>
          {userData.description ? (
            <h2 className="text-center text-slate-800">
              {userData.description}
            </h2>
          ) : (
            <></>
          )}
        </>
      );

    default:
      return (
        <>
          <h1 className="text-xl font-bold text-white">{userData.pageTitle}</h1>
          {userData.description ? (
            <h2 className="text-center text-white">{userData.description}</h2>
          ) : (
            <></>
          )}
        </>
      );
  }
};

export default PageTitle;
