import { IData } from "../../Interface";
import { useGetBrandsQuery } from "../../Redux/RTK Query/brands_slice";
import BrandCard from "./BrandCard"

function BrandsContainer() {
    const { data, isError, isLoading } = useGetBrandsQuery();

    return (
        <div>
            <h3 className="text-3xl font-semibold mb-4 border-b-2 w-fit pb-2 mx-auto">All Brands</h3>
            {!isLoading && isError && <p className="text-center text-error" >There is no data</p>}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5'>
                {!isLoading &&
                    !isError &&
                    data &&
                    data.data.map((brand: IData) => (
                        <BrandCard key={brand._id} brand={brand} isLoading={isLoading} />
                    ))}
            </div>
        </div>
    )
}

export default BrandsContainer