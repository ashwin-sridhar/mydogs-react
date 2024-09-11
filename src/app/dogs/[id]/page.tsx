import { Suspense } from 'react';
import DogInnerChart from '../../parts/dogInnerChart';
import GPSMap from '@/app/parts/GPSMap';

interface DogInnerProps {
  params: {
    id: string;
  };
}

export default function DogInner({ params }: DogInnerProps) {
  return (
    <div>
      <div className='flex flex-row h-[5vh] justify-center'><a href="/"><h1 className="text-xl text-cyan-500 hover:animate-pulse underline">Back to pack home</h1></a></div>
      <Suspense fallback={<div>Loading...</div>}>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='col-span-1'><p className='text-2xl text-white text-center'>Your dog&apos;s last 5 days</p><DogInnerChart id={params.id} />
        
        
        </div>
        <div className='col-span-1'><p className='text-2xl text-white text-center'>Your dog&apos;s current location. Updated every 45s. You may have to wait for upto 45s for the first pin.</p><GPSMap/></div>
      </div>
      </Suspense>
    </div>
  );
}