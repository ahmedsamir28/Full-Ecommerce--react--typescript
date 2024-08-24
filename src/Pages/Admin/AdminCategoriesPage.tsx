import AdminSideBar from "../../Components/Admin/AdminSideBar"
import AdminCategories from "../../Components/Admin/Categories/AdminCategories"

function AdminCategoriesPage() {
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5">
            <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:w-fit lg:mx-auto ">
                <div>
                    <AdminSideBar />
                </div>
                <div>
                    <AdminCategories title="all categories" buttonTitle="" pathTitle="" />
                </div>
            </div>
        </div>
    )
}

export default AdminCategoriesPage
