import UserOrders from "../../Components/User/Order/UserOrders"
import UserSideBar from "../../Components/User/UserSideBar"

function UserOrdersPage() {
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5">
            <div className="flex flex-col lg:flex-row lg:items-start gap-5 container">
                <div>
                    <UserSideBar />
                </div>
                <div className="lg:w-screen">
                    <UserOrders/>
                </div>
            </div>
        </div>
    )
}

export default UserOrdersPage
