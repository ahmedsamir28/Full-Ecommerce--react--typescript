import { ToastContainer } from "react-toastify";
import SubTitle from "../../../Utils/SubTitle"
import AdminAddSubCategory from "./AdminAddSubCategory";
import AdminCategoryTable from "./AdminSubcategoryTable"
interface cateTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function AdminSubcategories({ title, buttonTitle, pathTitle }: cateTitleProps) {
    return (
        <div className='mt-5 '>
            <div className="flex items-center mb-3">
                <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />

                <AdminAddSubCategory />
            </div>
            <div className="">
                <AdminCategoryTable />
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminSubcategories
