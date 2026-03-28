import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full text-center px-4">
      <div className="bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center max-w-2xl w-full">
        {/* Decorative 404 Container */}
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[150px] font-black text-gray-100 leading-none select-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-orange-100 p-4 rounded-full">
              <Construction className="h-12 w-12 text-orange-500" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-base leading-relaxed">
          Oops! The page you are looking for does not exist. It might have been moved, deleted, or perhaps it never existed in the first place.
        </p>

        <Link href="/">
          <Button className="bg-[#25a194] hover:bg-[#208b80] text-white h-12 px-8 rounded-lg text-base font-medium shadow-sm transition-all hover:shadow-md">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
