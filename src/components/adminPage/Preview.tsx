import { FC, useRef, useEffect, useState } from "react";
import LinkbudUserView from "~/pages/[username]";
import { useLinksStore } from "~/store/linksStore";

type PreviewProps = {
  userUrl: string;
};

const Preview: FC<PreviewProps> = ({ userUrl }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const links = useLinksStore((state) => state.links);
  const [scale, setScale] = useState("0.7");

  const getWindowSize = () => {
    if (typeof window !== "undefined") {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }
  };
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

  useEffect(() => {
    const timeOutId = setTimeout(
      () => iframeRef.current?.contentWindow?.location.reload(),
      2000,
    );
    return () => clearTimeout(timeOutId);
  }, [links]);

  return (
    <div className="fixed right-0 top-0 z-10 h-screen w-[570px] border-l">
      <div
        style={{
          transform: `translateX(-50%) translateY(-50%) scale(${scale})`,
        }}
        className={`absolute left-1/2 top-1/2 h-[690px] w-[320px] overflow-hidden rounded-[40px] border-[10px] border-black bg-gray-800`}
      >
        <LinkbudUserView />
      </div>
    </div>
  );
};

export default Preview;
