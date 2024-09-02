import { ToastContainer } from "react-toastify";
import SubTitle from "../../../Utils/SubTitle"
import AdminAddCategory from "./AdminAddCategory";
import AdminCategoryTable from "./AdminCategoryTable"
interface cateTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function AdminCategories({ title, buttonTitle, pathTitle }: cateTitleProps) {

    return (
        <div className='mt-5 '>
            <div className="flex items-center mb-3">
                <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />

                <AdminAddCategory/>
            </div>
            <div className="">
                <AdminCategoryTable/>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminCategories
