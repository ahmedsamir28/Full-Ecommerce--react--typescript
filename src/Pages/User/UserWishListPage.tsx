import UserSideBar from "../../Components/User/UserSideBar"
import UserWishList from "../../Components/User/WishList/UserWishList"

function UserWishListPage() {
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5">
            <div className="flex flex-col lg:flex-row lg:items-start gap-5 container">
                <div>
                    <UserSideBar />
                </div>
                <div className="lg:w-screen">
                    <UserWishList />
                </div>
            </div>
        </div>
    )
}

export default UserWishListPage
