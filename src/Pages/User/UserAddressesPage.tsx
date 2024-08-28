import UserAddresses from "../../Components/User/Addresses/UserAddresses"
import UserSideBar from "../../Components/User/UserSideBar"

function UserAddressesPage() {
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
        </div>
    )
}

export default UserAddressesPage
