export default function SkeletonLoader() {
  return (
    <div className="flex-1 max-w-xl flex flex-col items-start justify-center gap-3">
      <div className="w-full flex items-center justify-end gap-3">
        <span className="w-4 h-5 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></span>
        <span className="w-4 h-5 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></span>
        <span className="w-4 h-5 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></span>
        <span className="w-4 h-5 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></span>
      </div>
      <div className="w-full flex items-center justify-between ">
        <div className="w-1/2 flex items-center justify-center gap-10">
          <div className="w-28 h-14 rounded-full animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></div>
          <div className="w-full gap-3 flex flex-col items-start justify-center">
            <div className="w-1/2 h-4 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></div>
            <div className="w-1/2 h-4 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></div>
          </div>
        </div>
        <div className="w-1/3 h-8 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></div>
      </div>
      <div className="w-full flex justify-between items-center ">
        <div className="w-2/5 h-10 animate-pulse bg-gradient-to-r rounded-[5px] from-gray-800 to-gray-500"></div>
        <div className="w-2/5 h-10 animate-pulse bg-gradient-to-r rounded-[5px] from-gray-800 to-gray-500"></div>
      </div>
      <div className="w-full flex justify-between items-start">
        <div className="w-2/5 h-10 animate-pulse bg-gradient-to-r rounded-[5px] from-gray-800 to-gray-500"></div>
        <div className="w-2/5 h-10 animate-pulse bg-gradient-to-r rounded-[5px] from-gray-800 to-gray-500"></div>
      </div>
      <div className="w-1/3 h-4 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></div>
      <div className="w-1/4 h-4 rounded-[5px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></div>
      <div className="w-full flex items-center justify-center gap-4">
        <div className="w-1/2 h-14 rounded-[10px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></div>
        <div className="w-1/2 h-14 rounded-[10px] animate-pulse bg-gradient-to-r from-gray-800 to-gray-500"></div>
      </div>
    </div>
  );
}
