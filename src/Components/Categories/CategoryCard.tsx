import { Link } from 'react-router-dom';

// Define prop types
// interface CategoryCardProps {
//     image: string;
//     title: string;
//     id: string | number;
// }

const CategoryCard = () => {
    return (
        <>
            <div className='flex items-center py-3 px-6 gap-x-4 bg-zinc-100 rounded-2xl'>
                <div className='w-24 h-24'>
                    <Link to={`category/5`}>
                        <img alt="Category" src="/src/assets/assets/camera4.png" className="h-full" />
                    </Link>
                </div>
                <div className='flex flex-col gap-y-3 pl-5'>
                    <h6 className='text-md font-bold capitalize'>title of category</h6>
                    <Link to={`category/1}`}>
                        <span className='text-sm text-zinc-500 hover:text-zinc-600'>
                            Shop now <i className="fa-solid fa-angles-right"></i>
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default CategoryCard;
