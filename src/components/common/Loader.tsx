type LoaderProps = {
  loaderText?: string;
};

export default function Loader({ loaderText = 'Loading...' }: LoaderProps) {
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center py-[88px]">
        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-b-gray-300 animate-spin"></div>
        <div className="text-lg font-bold">{loaderText}</div>
      </div>
    </>
  );
}
