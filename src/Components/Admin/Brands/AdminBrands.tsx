import { ToastContainer } from "react-toastify";
import SubTitle from "../../../Utils/SubTitle"
import AdminAddBrand from "./AdminAddBrand";
import AdminBrandTable from "./AdminBrandTable";
interface cateTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function AdminBrands({ title, buttonTitle, pathTitle }: cateTitleProps) {
    return (
        <div className='mt-5 '>
            <div className="flex items-center mb-3">
                <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />

                <AdminAddBrand />
            </div>
            <div className="">
                <AdminBrandTable />
            </div>
            <ToastContainer />

        </div>
    )
}

export default AdminBrands
