import { IData } from "../../Interface";
import { useGetBrandsQuery } from "../../Redux/RTK Query/brands_slice";
import SubTitle from "../../Utils/SubTitle";
import BrandCard from "./BrandCard"

// Define prop types
interface brandTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function BrandFeatures({ title, buttonTitle, pathTitle }: brandTitleProps) {
    const { data, isError, isLoading } = useGetBrandsQuery();

    return (
        <div className="container mt-5 mb-10">
            <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
            {!isLoading && isError && <p className="text-center text-error" >There is no data</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5">
                {!isLoading &&
                    !isError &&
                    data &&
                    data.data.slice(0, 4).map((brand: IData) => (
                        <BrandCard key={brand._id} brand={brand} isLoading={isLoading} />
                    ))}
            </div>
        </div>
    )
}

export default BrandFeatures