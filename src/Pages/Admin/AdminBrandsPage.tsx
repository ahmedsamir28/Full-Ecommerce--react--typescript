import { useEffect } from "react";
import AdminSideBar from "../../Components/Admin/AdminSideBar"
import AdminBrands from "../../Components/Admin/Brands/AdminBrands"

function AdminBrandsPage() {
    useEffect(() => {
        document.title = "Admin brands Page";
    }, []);
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5 container">
            <div className="flex flex-col lg:flex-row lg:items-start gap-5 ">
                <div>
                    <AdminSideBar />
                </div>
                <div>
                    <AdminBrands title="all brands" buttonTitle="" pathTitle="" />
                </div>
            </div>
        </div>
    )
}

export default AdminBrandsPage
