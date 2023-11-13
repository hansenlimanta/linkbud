import { FC } from "react";

type BackgroundProps = {
  image: string;
  theme: string;
};

const Background: FC<BackgroundProps> = ({ theme, image }) => {
  switch (theme) {
    case "white":
      return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full bg-white">
          <img
            className="h-full w-full object-cover opacity-50 blur-lg"
            src={image}
            referrerPolicy="no-referrer"
            alt="bg"
          />
        </div>
      );
    case "black":
      return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            className="h-full w-full object-cover opacity-50 blur-lg"
            src={image}
            referrerPolicy="no-referrer"
            alt="bg"
          />
        </div>
      );

    default:
      return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            className="h-full w-full object-cover opacity-50 blur-lg"
            src={image}
            referrerPolicy="no-referrer"
            alt="bg"
          />
        </div>
      );
  }
};

export default Background;
