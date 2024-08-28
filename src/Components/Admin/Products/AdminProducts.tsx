import SubTitle from "../../../Utils/SubTitle"
import AdminAddProduct from "./AdminAddProduct"
import AdminProductCard from "./AdminProductCard";

interface prodTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function AdminProducts({ title, buttonTitle, pathTitle }: prodTitleProps) {

    return (
        <div className='mt-5 '>
            <div className="flex items-center mb-3">
                <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />

                <AdminAddProduct />
            </div>
            <div className='container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2'>
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
            </div>
        </div>

    )
}

export default AdminProducts