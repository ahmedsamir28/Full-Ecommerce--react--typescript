import Button from "../../../UI-items/Button"

function UserHandlePassword() {
    return (
        <div className="mt-5 border-2 rounded-lg py-3 ">
            <div className="text-xl font-bold text-zinc-500  capitalize ml-2">change Password</div>
            <div className='flex justify-between items-start flex-col gap-5 px-5 mt-5'>
                <input type="password" className="input input-bordered input-info w-full" placeholder="Enter Your Old Password" />
                <input type="password" className="input input-bordered input-info w-full" placeholder="Enter Your new Password" />
                <input type="password" className="input input-bordered input-info w-full" placeholder="Enter Your new Password" />
                <div className="text-end w-full">
                <Button className="capitalize btn btn-success btn-outline">save Password</Button>
            </div>
            </div>
        </div>
    )
}

export default UserHandlePassword
