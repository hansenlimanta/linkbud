const Themes = () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7];
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
              <div className="h-[200px] w-full cursor-pointer rounded-lg border"></div>
              <p className="py-3">Custom</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Themes;
