import { GoPlus } from "react-icons/go";
import { api } from "~/utils/api";

type SimpleTheme = {
  key: string;
  name: string;
  image: string;
  background: string;
  buttonStyle: string;
  typeface: string;
};

const Themes = () => {
  const utils = api.useContext();
  const updateThemes = api.user.updateUserTheme.useMutation({
    onSuccess: async () => {
      await utils.user.getUserAndTheme.invalidate();
    },
  });
  const handleSelectTheme = (theme: SimpleTheme) => {
    updateThemes.mutate({
      key: theme.key,
      background: theme.background,
      buttonStyle: theme.buttonStyle,
      typeface: theme.typeface,
    });
  };

  const data = [
    {
      key: "default",
      name: "Custom",
      image: "",
      background: "#ffffff",
      buttonStyle: "#000000",
      typeface: "sans-serif",
    },
    {
      key: "ulster",
      name: "Ulster",
      image: "/ulster-theme.svg",
      background: "#ffffff",
      buttonStyle: "#000000",
      typeface: "sans-serif",
    },
    {
      key: "warburton",
      name: "Warburton",
      image: "/warburton-theme.svg",
      background: "#ffffff",
      buttonStyle: "#000000",
      typeface: "sans-serif",
    },
    {
      key: "sugden",
      name: "Sugden",
      image: "/sugden-theme.svg",
      background: "#ffffff",
      buttonStyle: "#000000",
      typeface: "sans-serif",
    },
    {
      key: "merlin",
      name: "Merlin",
      image: "/merlin-theme.svg",
      background: "#ffffff",
      buttonStyle: "#000000",
      typeface: "sans-serif",
    },
  ];
  return (
    <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Themes</p>
      <div className="inline-grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 rounded-2xl bg-white p-6">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="flex h-fit w-full flex-col items-center justify-start"
              onClick={() => handleSelectTheme(item)}
            >
              <div className="h-[200px] w-full cursor-pointer rounded-lg border">
                {item.key === "default" ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <GoPlus size={30} />
                  </div>
                ) : (
                  <img
                    className="h-full w-full rounded-lg object-cover"
                    src={item.image}
                    alt="bg"
                  />
                )}
              </div>
              <p className="py-3">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Themes;
