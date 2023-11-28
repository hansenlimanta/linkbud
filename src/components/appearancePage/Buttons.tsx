const Buttons = () => {
  const data = [0, 1, 2];
  return (
    <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Buttons</p>
      <div className="flex flex-col gap-2 rounded-2xl bg-white p-6">
        <p>Fill</p>
        <div className="inline-grid w-full grid-cols-2 gap-4 md:grid-cols-3">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-fit w-full flex-col items-center justify-start"
              >
                <div className="h-9 w-full cursor-pointer rounded-lg border"></div>
              </div>
            );
          })}
        </div>
        <p>Outline</p>
        <div className="inline-grid w-full grid-cols-2 gap-4 md:grid-cols-3">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-fit w-full flex-col items-center justify-start"
              >
                <div className="h-9 w-full cursor-pointer rounded-lg border"></div>
              </div>
            );
          })}
        </div>
        <p>Soft shadow</p>
        <div className="inline-grid w-full grid-cols-2 gap-4 md:grid-cols-3">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-fit w-full flex-col items-center justify-start"
              >
                <div className="h-9 w-full cursor-pointer rounded-lg border"></div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="font-semibold">Button color</p>
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

export default Buttons;
