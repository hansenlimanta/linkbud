import { GoPlus } from "react-icons/go";

const Themes = () => {
  const data = [
    {
      id: "default",
      name: "Custom",
      image: "",
    },
    {
      id: "ulster",
      name: "Ulster",
      image: "/ulster-theme.svg",
    },
    {
      id: "warburton",
      name: "Warburton",
      image: "/warburton-theme.svg",
    },
    {
      id: "sugden",
      name: "Sugden",
      image: "/sugden-theme.svg",
    },
    {
      id: "warburton",
      name: "Warburton",
      image: "/warburton-theme.svg",
    },
    {
      id: "ulster",
      name: "Ulster",
      image: "/ulster-theme.svg",
    },
    {
      id: "warburton",
      name: "Warburton",
      image: "/warburton-theme.svg",
    },
    {
      id: "ulster",
      name: "Ulster",
      image: "/ulster-theme.svg",
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
            >
              <div className="h-[200px] w-full cursor-pointer rounded-lg border">
                {item.name === "Custom" ? (
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
