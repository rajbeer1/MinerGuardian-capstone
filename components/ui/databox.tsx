import { useRouter } from "next/navigation";
import { Button } from "./button";

// DataBox Component
export const DataBox = ({ data }:any) => {
  const router = useRouter()
  return (
    <div className="bg-gradient-to-r from-purple-200 to-indigo-200  p-4 rounded shadow-md text-black flex flex-col justify-between h-full ">
      <div>
        <div className="mb-2 mt-2 text-lg">
          Latitude:{' '}
          <span className="text-2xl text-stone-600">{data.latitude}</span>
        </div>
        <div className="mb-2 mt-2 text-lg ">
          Longitude:{' '}
          <span className="text-2xl text-stone-600">{data.longitude}</span>
        </div>
        <div className="mb-2 mt-2 text-lg ">
          Altitude:{' '}
          <span className="text-2xl text-stone-600">{data.altitude} </span>
          meters
        </div>
        <div className="mb-2 mt-2 text-lg ">
          Temperature:{' '}
          <span className="text-2xl text-stone-600">{data.temperature} </span>
          °C
        </div>
        <div className="mb-2 mt-2 text-lg ">
          Distance:{' '}
          <span className="text-2xl text-stone-600">{data.distance} </span>{' '}
          metres
        </div>
        <div className="mb-2 mt-2 text-lg ">
          Working:{' '}
          <span className="text-2xl text-stone-600">
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
      <div className="">
        <Button
          className="mt-4"
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
