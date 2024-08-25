import AdminSideBar from "../../Components/Admin/AdminSideBar"
import AdminSubcategories from "../../Components/Admin/SubCategories/AdminSubcategories"

function AdminSubCategoriesPage() {
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5 container">
        <div className="flex flex-col lg:flex-row lg:items-start gap-5 ">
            <div>
                <AdminSideBar />
            </div>
            <div>
                <AdminSubcategories title="all subcategories" buttonTitle="" pathTitle="" />
            </div>
        </div>
    </div>
    )
}

export default AdminSubCategoriesPage
