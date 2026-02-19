export default function SolicitudesSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 animate-pulse"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-44 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
