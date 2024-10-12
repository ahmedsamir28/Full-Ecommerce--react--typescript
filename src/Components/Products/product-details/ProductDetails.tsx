import { useParams } from "react-router-dom";
import ProductGallery from "./ProductGallery";
import ProductText from "./ProductText";
import { useGetProductIdQuery } from "../../../Redux/RTK Query/products_slice";

function ProductDetails() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useGetProductIdQuery(id || '');

    if (isError) {
        return <div className="text-center text-red-600 my-20">Error occurred while fetching product details.</div>;
    }

    return (
        <div className='container py-5'>
            <div className='flex flex-col lg:flex-row gap-10 items-start '>
                <div className='w-11/12 lgg:w-6/12  h-9/12 lgg:h-96 rounded-lg'>
                    <ProductGallery  product={ data } isLoading = {isLoading}/>
                </div>
                <div className='rounded-lg w-11/12'>
                    <ProductText product={ data?.data } isLoading={isLoading}/>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;