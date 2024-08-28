import Button from "../../../UI-items/Button"
import { useState } from "react";
import Modal from "../../../UI-items/Modal";

function UserAddAddress() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    return (
        <div className="flex items-center justify-center">
            <Button onClick={() => setIsOpenConfirmModal(true)} className="w-46 btn btn-outline capitalize btn-success"> <i className="fa-solid fa-plus text-lg"></i>
                add new address
            </Button>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={() => setIsOpenConfirmModal(false)}
                title="Add Address"
                add="Add Address"
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
        </div>
    )
}

export default UserAddAddress
