import SubTitle from "../../../Utils/SubTitle"
import AdminCategoryTable from "./AdminCategoryTable"
interface cateTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function AdminCategories({ title, buttonTitle, pathTitle }: cateTitleProps) {
    return (
        <div className='mt-5'>
            <div className="mb-3">
                <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
            </div>
            <div>
                <AdminCategoryTable />
            </div>
        </div>
    )
}

export default AdminCategories
