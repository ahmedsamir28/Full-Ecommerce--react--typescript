import { ToastContainer } from "react-toastify";
import SubTitle from "../../../Utils/SubTitle";
import AdminAddProduct from "./AdminAddProduct";
import AdminProductCard from "./AdminProductCard";
import { useGetProductsQuery } from "../../../Redux/RTK Query/products_slice";
import { IProduct } from "../../../Interface";

interface ProdTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}

function AdminProducts({ title, buttonTitle, pathTitle }: ProdTitleProps) {
    const { data, isError, isLoading } = useGetProductsQuery();

    return (
        <div className='mt-5'>
            <div className="flex items-center mb-3">
                <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
                <AdminAddProduct />
            </div>

            <div className='container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2'>
                {!isLoading && !isError && data?.data.map((product: IProduct) => (
                    <AdminProductCard key={product._id} product={product} isLoading={isLoading} />
                ))}
            </div>

            <ToastContainer />
        </div>
    );
}

export default AdminProducts;
