import Image from "../../../UI-items/Image"
import UserAddAddress from "./UserAddAddress"
import UserAddressCard from "./UserAddressCard"

function UserAddresses() {
    const test: boolean =  true
    return (
        <div className="container">
            <div className={`flex ${test ? 'items-start':'items-center'} flex-col-reverse`}>
                <div>
                    <UserAddAddress />
                </div>
                {/* <div>
                        <Image url="/src/assets/addresses.svg" alt="" className="w-96 h-96" />
                        <div className="text-center">
                            <h6 className="text-xl font-medium capitalize mb-2">No saved addresses</h6>
                            <p className="text-zinc-600 mb-10 text-md">Add your addresses for fast and easy checkout across our marketplaces</p>
                        </div>
                    </div> */}
            </div>
            <div className="mt-5 flex flex-col gap-5">
                <UserAddressCard />
                <UserAddressCard />

            </div>
        </div>
    )
}

export default UserAddresses
