export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Animated seedling icon inside glowing circle */}
        <div className="relative w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg border border-emerald-300">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin"></div>
          <i className="fa-solid fa-seedling text-emerald-800 text-2xl animate-pulse"></i>
        </div>

        <div className="text-center">
          <span className="font-extrabold text-sm text-[#002719] block tracking-wide">
            GreenRoot Farm
          </span>
          <span className="text-stone-400 text-xs font-medium">
            Loading fresh organic produce...
          </span>
        </div>
      </div>
    </div>
  );
}
