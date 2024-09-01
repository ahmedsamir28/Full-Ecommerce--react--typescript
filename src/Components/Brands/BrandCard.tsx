import { Link } from "react-router-dom"
import { IData } from "../../Interface";

interface IBrandCardProps {
    brand: IData;
    isLoading: boolean;
}

function BrandCard({ brand, isLoading }: IBrandCardProps) {
    return (
        <>
            {
                isLoading ? (
                    <div className="flex items-center py-3 px-6 gap-x-4 bg-zinc-100 rounded-2xl animate-pulse">
                        {/* Skeleton for the image */}
                        <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>

                        {/* Skeleton for the text */}
                        <div className="flex flex-col gap-y-3 pl-5 w-full">
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>) : (
                    <div className='flex items-center py-3 px-6 gap-x-4 bg-zinc-100 rounded-2xl'>
                        <div className='w-24 h-24'>
                            <Link to="/products/brand/5">
                                <img alt="brand" src={brand.image} className="h-full" />
                            </Link>
                        </div>
                        <div className='flex flex-col gap-y-3 pl-5'>
                            <h6 className='text-md font-bold capitalize'>{brand.name}</h6>
                        </div>
                    </div>)
            }


        </>
    )
}

export default BrandCard