import { useEffect } from "react";
import AdminSideBar from "../../Components/Admin/AdminSideBar"
import AdminCoupons from "../../Components/Admin/Coupons/AdminCoupons"

function AdminCouponsPage() {
    useEffect(() => {
        document.title = "Admin Add Coupon";
    }, []);
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5 container">
            <div className="flex flex-col lg:flex-row lg:items-start gap-5 ">
                <div>
                    <AdminSideBar />
                </div>
                <div>
                    <AdminCoupons title="all coupons" buttonTitle="" pathTitle="" />
                </div>
            </div>
        </div>
    )
}

export default AdminCouponsPage
