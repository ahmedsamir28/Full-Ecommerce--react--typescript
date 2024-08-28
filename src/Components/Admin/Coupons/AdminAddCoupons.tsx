import { useState } from "react";
import Button from "../../../UI-items/Button"
import Modal from "../../../UI-items/Modal"

function AdminAddCoupon() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    return (
        <div className="flex items-center justify-center">
            <Button onClick={() => setIsOpenConfirmModal(true)} className="w-46 btn btn-outline capitalize btn-success"> <i className="fa-solid fa-plus text-lg"></i>  add coupon</Button>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={() => setIsOpenConfirmModal(false)}
                title="Add sub-Category"
                add="Add sub-Category"
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Sub-Category :
                    <input type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Type here" />
                </label>
                <select className="select select-info w-full text-lg capitalize text-zinc-600">
                        <option disabled selected>Main Category</option>
                        <option>English</option>
                        <option>Japanese</option>
                        <option>Italian</option>
                    </select>
            </Modal>
        </div>
    )
}

export default AdminAddCoupon
