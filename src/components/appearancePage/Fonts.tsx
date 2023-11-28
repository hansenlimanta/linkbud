const Fonts = () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="mt-10 flex w-full max-w-[620px] flex-col gap-4">
      <p className="text-xl font-semibold">Fonts</p>
      <div className="rounded-2xl bg-white p-6">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Font</p>
          <div className="flex h-20 w-full cursor-pointer items-center justify-start gap-4 rounded-xl border-2 hover:bg-slate-300"></div>
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

export default Fonts;
