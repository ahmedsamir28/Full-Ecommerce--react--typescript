import DeleteCouponsHook from "../../../Hooks/Admin/Coupons/Delete_Coupons_Hook";
import UpdateCouponsHook from "../../../Hooks/Admin/Coupons/Update_Coupons_Hook";
import { useGetCouponsQuery } from "../../../Redux/RTK Query/coupons_slice";
import Button from "../../../UI-items/Button";
import Modal from "../../../UI-items/Modal";

function AdminCouponsTable() {
    const { data, isLoading, isError } = useGetCouponsQuery();
    const [dateRef, isOpenConfirmEditModal, handleCloseModal, handleShowEditModal, state, handleInputChange, isCouponLoading, handleFormSubmit] = UpdateCouponsHook()
    const [isOpenDeleteModal,handleCloseDeleteModal ,handleShowDeleteModal, isDeleting, removeCouponHandler] = DeleteCouponsHook()
    if (isError) {
        return <p>Something went wrong!</p>;
    }

    return (
        <>
            <Modal
                isOpen={isOpenDeleteModal}
                closeModal={handleCloseDeleteModal}
                onSubmit={removeCouponHandler}
                title="Confirm deletion"
                add={isDeleting ? 'Loading...' : 'remove Coupon'}
                btnClass="error"
            >
                <p>Are you sure about the category deletion process?</p>
            </Modal>
            <Modal
                isOpen={isOpenConfirmEditModal}
                closeModal={handleCloseModal}
                onSubmit={handleFormSubmit}
                title="Edit Coupon"
                add={isCouponLoading ? 'Loading...' : 'Edit Coupon'}
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Coupon Name"
                    />
                </label>

                <label htmlFor="textarea" className="capitalize">
                    Expiry Date:
                </label>
                <input
                    type="date"
                    id="expire"
                    name="expire"
                    value={state.expire}
                    onChange={handleInputChange}
                    className="textarea textarea-info text-lg mt-2 w-full placeholder:text-zinc-500 text-gray-700 capitalize"
                    placeholder="Expiry Date"
                    onFocus={() => { if (dateRef.current) dateRef.current.type = "date"; }}
                    onBlur={() => { if (dateRef.current) dateRef.current.type = "text"; }}
                ></input>

                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Discount:
                    <input
                        type="text"
                        name="discount"
                        value={String(state.discount)}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Discount"
                    />
                </label>
            </Modal>

            <div className="overflow-x-auto border-2 rounded-lg xl:w-[900px] 2xl:w-[1000px]">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="capitalize font-extrabold text-black text-sm">#</th>
                            <th className="capitalize font-extrabold text-black text-sm">Coupon Name</th>
                            <th className="capitalize font-extrabold text-black text-sm">Expiry Date</th>
                            <th className="capitalize font-extrabold text-black text-sm">Discount Percentage</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }, (_, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="animate-pulse bg-gray-200 h-4 w-6 rounded"></div>
                                    </td>
                                    <td>
                                        <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
                                    </td>
                                    <td>
                                        <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
                                    </td>
                                    <td>
                                        <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
                                    </td>
                                    <td className="flex items-center justify-end gap-5">
                                        <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                                        <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            data && data?.data?.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{new Date(item.expire).toLocaleDateString()}</td>
                                    <td>{item.discount}%</td>
                                    <td className="flex items-center justify-end gap-5">
                                        <Button onClick={(e) => handleShowDeleteModal(e, item._id)} className="btn btn-outline btn-error capitalize">
                                            <i className="fa-regular fa-trash-can"></i> Delete
                                        </Button>
                                        <Button onClick={(e) => handleShowEditModal(e, item._id, item.name, item.expire, item.discount.toString())} className="btn btn-outline btn-warning capitalize">
                                            <i className="fa-regular fa-pen-to-square"></i> Update
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminCouponsTable;
