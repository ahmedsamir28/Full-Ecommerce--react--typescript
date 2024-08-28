import { useState } from "react";
import Modal from "../../../UI-items/Modal";

function UserProfileCard() {
    const [handleEditModal, setHandleEditModal] = useState(false);
    return (
        <>
            {/* modal of edit the product*/}
            <Modal
                isOpen={handleEditModal}
                closeModal={() => setHandleEditModal(false)}
                title="Edit Address"
                add="Edit Address"
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Name:
                    <input type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="user-name" />
                </label>

                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Phone:
                    <input type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="phone-number" />
                </label>

                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Email:
                    <input type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="your-email" />
                </label>
            </Modal >
            <div className='flex justify-between border-2 py-5 px-7 rounded-lg items-start'>
                <div className='flex justify-start flex-col gap-3'>
                    <div className="flex gap-2">
                        <h3 className='font-medium text-zinc-400'>Name :</h3>
                        <span className='text-zinc-800 text-sm'> user name</span>
                    </div>
                    <div className='capitalize font-medium flex gap-2'>
                        <div className="text-zinc-400">Phone Number :</div>
                        <div className='text-start '>
                            01032057474
                        </div>
                    </div>
                    <div className='font-medium text-zinc-400'>Email : <span className='text-zinc-600 ml-2'> user@gmail.com </span></div>
                </div>
                <div className='flex justify-start items-center gap-5'>
                    <div onClick={() => setHandleEditModal(true)} className='cursor-pointer font-bold text-zinc-400 hover:text-zinc-600 underline'>Edit </div>
                </div>
            </div>
        </>

    )
}

export default UserProfileCard
