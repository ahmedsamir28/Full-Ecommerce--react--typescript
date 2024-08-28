import { useState } from "react";
import Modal from "../../../UI-items/Modal"

function UserAddressCard() {
    const [handleEditModal, setHandleEditModal] = useState(false);
    const [handleRemoveModal, setHandleRemoveModal] = useState(false);
    return (
        <>
        {/* modal of remove the product */}
        <Modal
                isOpen={handleRemoveModal}
                closeModal={() => setHandleRemoveModal(false)}
                title="Confirm deletion"
                add="Remove Address"
                btnClass="error"
            >
                <p>Are you sure about the address deletion process ?</p>
            </Modal>

            {/* modal of edit the product*/}
            <Modal
                isOpen={handleEditModal}
                closeModal={() => setHandleEditModal(false)}
                title="Edit Address"
                add="Edit Address"
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    The address:
                    <input type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Naming the address, for example (home - work)" />
                </label>

                <label htmlFor="textarea" className="capitalize">
                    Description:
                </label>
                <textarea id="textarea" className="textarea textarea-info text-lg mt-2 w-full placeholder:text-zinc-500 text-gray-700 capitalize" placeholder="Detailed address"></textarea>

                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Phone:
                    <input type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Phone Number" />
                </label>
            </Modal>
            <div className='flex justify-between border-2 py-5 px-7 rounded-lg items-start'>
                <div className='flex justify-start flex-col gap-3'>
                    <div className="flex gap-9">
                        <h3 className='capitalize font-medium text-zinc-400'>name :</h3>
                        <span className='text-zinc-800 text-sm'> kferElshisk-qilin-shabassemair</span>
                    </div>
                    <div className='capitalize font-medium flex gap-5'>
                        <div className="text-zinc-400">address :</div>
                        <div className='text-start '>
                            <div className="font-semibold">fdsfsdgdfgfd f gfdh h gh fgh</div> <div className="text-zinc-500 text-sm">asfafafhgfhjghgaf</div>
                        </div>
                    </div>
                    <div className='capitalize font-medium text-zinc-400'>phone Number : <span className='text-zinc-600'> 0102578994 </span></div>
                </div>
                <div className='flex justify-start items-center gap-5'>
                    <div onClick={() => setHandleRemoveModal(true)}  className='cursor-pointer font-bold text-zinc-400 hover:text-zinc-600 underline'>Delete </div>
                    <div onClick={() => setHandleEditModal(true)}  className='cursor-pointer font-bold text-zinc-400 hover:text-zinc-600 underline'>Edit </div>
                </div>
            </div>
        </>

    )
}

export default UserAddressCard
