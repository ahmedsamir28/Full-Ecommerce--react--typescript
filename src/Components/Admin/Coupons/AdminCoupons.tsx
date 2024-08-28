import SubTitle from "../../../Utils/SubTitle"
import AdminAddCoupon from "./AdminAddCoupons";
import AdminCouponsTable from "./AdminCouponTable";
interface cateTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function AdminCoupons({ title, buttonTitle, pathTitle }: cateTitleProps) {
    return (
        <div className='mt-5 '>
            <div className="flex items-center mb-3">
                <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />

                <AdminAddCoupon />
            </div>
            <div className="">
                <AdminCouponsTable/>
            </div>
        </div>
    )
}

export default AdminCoupons
