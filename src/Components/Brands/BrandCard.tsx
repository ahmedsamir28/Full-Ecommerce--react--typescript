import { Link } from "react-router-dom"

function BrandCard() {
    return (
        <>
        <div className='flex items-center py-3 px-6 gap-x-4 bg-zinc-100 rounded-2xl'>
            <div className='w-24 h-24'>
                <Link to="/products/brand/5">
                    <img alt="Category" src="/src/assets/assets/Headphone9.png" className="h-full" />
                </Link>
            </div>
            <div className='flex flex-col gap-y-3 pl-5'>
                <h6 className='text-md font-bold capitalize'>title of brands</h6>
            </div>
        </div>
    </>
    )
}

export default BrandCard