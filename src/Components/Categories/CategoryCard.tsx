import { Link } from 'react-router-dom';
import { IData } from '../../Interface';

// Define prop types
interface ICategoryCardProps {
    category: IData;
    isLoading: boolean;
}

const CategoryCard = ({ category, isLoading }: ICategoryCardProps) => {

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
                            <Link to="/category/5">
                                <img alt="Category" src={category.image} className="h-full" />
                            </Link>
                        </div>
                        <div className='flex flex-col gap-y-3 pl-5'>
                            <h6 className='text-md font-bold capitalize'>{category.name}</h6>
                            <Link to="/category/5">
                                <span className='flex justify-between items-center  w-20 text-sm text-zinc-500 hover:text-zinc-600'>
                                    Shop now <i className="fa-solid fa-angles-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>)
            }

        </>
    );
}

export default CategoryCard;
