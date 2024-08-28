import SubTitle from "../../../Utils/SubTitle"
import UserHandlePassword from "./UserHandlePassword"
import UserProfileCard from "./UserProfileCard"

function Userprofile() {
    return (
        <div className='mt-5'>
            <div className="mb-5">
                <SubTitle title="Profile page" />
            </div>
            <div className="">
                <div>
                    <UserProfileCard />
                </div>
                <div>
                    <UserHandlePassword />
                </div>
            </div>
        </div>
    )
}

export default Userprofile
