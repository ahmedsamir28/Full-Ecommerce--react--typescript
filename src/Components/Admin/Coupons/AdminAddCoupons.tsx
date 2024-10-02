import AddCouponsHook from "../../../Hooks/Admin/Coupons/Add_Coupons_Hook"
import Button from "../../../UI-items/Button"
import Modal from "../../../UI-items/Modal"

function AdminAddCoupon() {
const [dateRef, isOpenConfirmModal, handleCloseModal, state, handleShowAddModal, handleInputChange, isCouponLoading, handleFormSubmit]  = AddCouponsHook()
    return (
        <div className="flex items-center justify-center">
            <Button onClick={handleShowAddModal} className="w-46 btn btn-outline capitalize btn-success">
                <i className="fa-solid fa-plus text-lg"></i>  add coupon
            </Button>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={handleCloseModal}
                onSubmit={handleFormSubmit}
                title="Add Coupons"
                add={isCouponLoading ? "Loading ..." : "Add Coupons"}
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Add Coupons"
                    />
                </label>

                <label htmlFor="textarea" className="capitalize">
                    expire:
                </label>
                <input
                    type="date"
                    id="text"
                    name="expire"
                    value={state.expire}
                    onChange={handleInputChange}
                    className="textarea textarea-info text-lg mt-2 w-full placeholder:text-zinc-500 text-gray-700 capitalize"
                    placeholder="Detailed address"
                    onFocus={() => { if (dateRef.current) dateRef.current.type = "date" }}
                    onBlur={() => { if (dateRef.current) dateRef.current.type = "text" }}
                ></input>

                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Discount:
                    <input
                        type="text"
                        name="discount"
                        value={state.discount}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="The Discount"
                    />
                </label>
            </Modal>
        </div>
    )
}

export default AdminAddCoupon
