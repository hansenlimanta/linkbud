const Backgrounds = () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Backgrounds</p>
      <div className="rounded-2xl bg-white p-6">
        <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
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
        <div className="mt-4 flex flex-col gap-2">
          <p className="font-semibold">Color</p>
          <div className="flex items-center justify-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-300" />
            <div className="flex h-12 w-40 flex-col items-start justify-center rounded-lg bg-gray-300 px-4">
              <p className="text-sm text-gray-500">Color</p>
              <p>#ffffff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backgrounds;
