import { useEffect } from "react";
import AdminSideBar from "../../Components/Admin/AdminSideBar"
import DashBoard from "../../Components/Admin/DashBoard/DashBoard"
import { ToastContainer } from "react-toastify";

function DashBoardAdminPage() {
    useEffect(() => {
        document.title = "DashBoard Admin Page";
    }, []);
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5">
            <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:w-fit lg:mx-auto ">
                <div>
                    <AdminSideBar />
                </div>
                <div>
                    <DashBoard />
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default DashBoardAdminPage