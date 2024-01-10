import { FC, useRef, useEffect, useState } from "react";
import { useLinksStore } from "~/store/linksStore";
import Linkbud from "../linkbudPage/Linkbud";
import { Link, Theme, User } from "@prisma/client";

type PreviewProps = {
  user: User;
  theme: Theme;
  links: Link[];
};

const Preview: FC<PreviewProps> = ({ links, theme, user }) => {
  const getWindowSize = () => {
    if (typeof window !== "undefined") {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }
  };
  const [scale, setScale] = useState("0.7");
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (!windowSize?.innerHeight) return;
    setScale((windowSize.innerHeight / 1000).toFixed(2).toString());
  }, [windowSize?.innerHeight]);

  return (
    <div className="fixed right-0 top-0 z-10 h-screen w-[570px] border-l">
      <div
        style={{
          transform: `translateX(-50%) translateY(-50%) scale(${scale})`,
        }}
        className={`absolute left-1/2 top-1/2 h-[690px] w-[320px] overflow-hidden rounded-[40px] border-[10px] border-black bg-gray-800`}
      >
        <Linkbud links={links} theme={theme} user={user} />
      </div>
    </div>
  );
};

export default Preview;
