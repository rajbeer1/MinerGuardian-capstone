import { useRouter } from 'next/navigation';
import { Button } from './button';

// DataBox Component
export const DataBox = ({ data }: any) => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-4 rounded shadow-md text-black flex flex-col justify-between h-full overflow-hidden">
      <div className="space-y-2 overflow-y-auto flex-grow">
        <div className="text-lg flex flex-wrap items-center">
          <span className="mr-2">Latitude:</span>
          <span className="text-xl text-stone-600 break-all">
            {data.latitude}
          </span>
        </div>
        <div className="text-lg flex flex-wrap items-center">
          <span className="mr-2">Longitude:</span>
          <span className="text-xl text-stone-600 break-all">
            {data.longitude}
          </span>
        </div>
        <div className="text-lg flex flex-wrap items-center">
          <span className="mr-2">Altitude:</span>
          <span className="text-xl text-stone-600">{data.altitude}</span>
          <span className="ml-1">meters</span>
        </div>
        <div className="text-lg flex flex-wrap items-center">
          <span className="mr-2">Temperature:</span>
          <span className="text-xl text-stone-600">{data.temperature}</span>
          <span className="ml-1">°C</span>
        </div>
        <div className="text-lg flex flex-wrap items-center">
          <span className="mr-2">Distance:</span>
          <span className="text-xl text-stone-600">{data.distance}</span>
          <span className="ml-1">metres</span>
        </div>
        <div className="text-lg flex flex-wrap items-center">
          <span className="mr-2">Working:</span>
          <span className="text-xl text-stone-600">
            {data.vibration ? (
              <div className="w-16 h-8 bg-green-500 text-white flex items-center justify-center text-lg font-bold rounded">
                Yes
              </div>
            ) : (
              <div className="w-16 h-8 bg-red-400 text-white flex items-center justify-center text-lg font-bold rounded">
                No
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <Button
          className="w-full"
          onClick={() => {
            router.push('/map');
          }}
        >
          Show the Map
        </Button>
      </div>
    </div>
  );
};
