import { ToastContainer } from "react-toastify"
import UserAddresses from "../../Components/User/Addresses/UserAddresses"
import UserSideBar from "../../Components/User/UserSideBar"
import { useEffect } from "react";

function UserAddressesPage() {
    useEffect(() => {
        document.title = "User Address";
    }, []);
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5">
            <div className="flex flex-col lg:flex-row lg:items-start gap-5 container">
                <div>
                    <UserSideBar />
                </div>
                <div className="lg:w-screen">
                    <UserAddresses />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserAddressesPage
