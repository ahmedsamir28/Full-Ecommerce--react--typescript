import SubTitle from "../../../Utils/SubTitle"
import UserOrderItem from "./UserOrderItem";


function UserOrders() {
    return (
        <div className='mt-5'>
            <div className="mb-3">
                <SubTitle title="number of orders # 54" />
            </div>
            <div className="">
                <UserOrderItem />
            </div>
        </div>
    )
}

export default UserOrders
