import SubTitle from "../../../Utils/SubTitle"
import DashBoardHeader from "./DashBoardHeader"
import DashBoardTable from "./DashBoardTable"

function DashBoard() {
    return (
        <div className="container">
            <div className="mb-5">
                <DashBoardHeader />
            </div>
            <div className="my-2">
                <SubTitle title="Order Status" buttonTitle="" pathText="" />
            </div >
            <div>
                <DashBoardTable/>
            </div>
        </div>
    )
}

export default DashBoard