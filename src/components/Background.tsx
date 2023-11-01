import { FC, useEffect, useState } from "react";

type BackgroundProps = {
  theme: string;
};

const Background: FC<BackgroundProps> = ({ theme }) => {
  const [profilePicture, setProfilePicture] = useState("");
  useEffect(() => {
    getProfilePicture();
  }, []);

  async function getProfilePicture() {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0].picture.large);

        setProfilePicture(data.results[0].picture.large);
      });
  }
  switch (theme) {
    case "white":
      return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full bg-white">
          <img
            className="h-full w-full object-cover opacity-50 blur-lg"
            src={profilePicture}
            alt="bg"
          />
        </div>
      );
    case "black":
      return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            className="h-full w-full object-cover opacity-50 blur-lg"
            src={profilePicture}
            alt="bg"
          />
        </div>
      );

    default:
      return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            className="h-full w-full object-cover opacity-50 blur-lg"
            src={profilePicture}
            alt="bg"
          />
        </div>
      );
  }
};

export default Background;
