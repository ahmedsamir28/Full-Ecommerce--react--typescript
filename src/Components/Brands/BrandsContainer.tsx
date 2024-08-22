import BrandCard from "./BrandCard"

function BrandsContainer() {
    return (
        <div>
            <h3 className="text-3xl font-semibold mb-4 border-b-2 w-fit pb-2 mx-auto">All Brands</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5'>
                <BrandCard/>
                <BrandCard/>
                <BrandCard/>
                <BrandCard/>
                <BrandCard/>
                <BrandCard/>
                <BrandCard/>
                <BrandCard/>
            </div>
        </div>
    )
}

export default BrandsContainer