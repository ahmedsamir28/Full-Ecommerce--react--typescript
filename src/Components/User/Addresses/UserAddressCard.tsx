import Modal from "../../../UI-items/Modal";
import { Address } from "../../../Interface";
import DeleteUserAddressHook from "../../../Hooks/User/Addresses/Delete_User_Address_Hook";
import EditUserAddressHook from "../../../Hooks/User/Addresses/Edit_User_Address_Hook";

interface IAddress {
    address: Address | undefined;
    isLoading: boolean;
}

function UserAddressCard({ address, isLoading }: IAddress) {
    const [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, addressIsLoading, deleteAddressHandler] =DeleteUserAddressHook();
    const [isOpenEditModal, handleCloseEditModal, editAddressIsLoading, state, handleShowEditModal, handleInputChange, handleFormSubmit] = EditUserAddressHook(address)
    return (
        <>
            {/* Modal for deleting address */}
            <Modal
                isOpen={isOpenDeleteModal}
                closeModal={handleCloseDeleteModal}
                onSubmit={deleteAddressHandler}
                title="Confirm deletion"
                add={addressIsLoading ? "Loading ..." : "Remove Address"}
                btnClass="error"
            >
                <p>Are you sure about deleting this address?</p>
            </Modal>

            {/* Modal for editing address */}
            <Modal
                isOpen={isOpenEditModal}
                closeModal={handleCloseEditModal}
                onSubmit={handleFormSubmit}
                title="Edit Address"
                add={editAddressIsLoading ? "Editing..." : "Edit Address"}
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Address Name:
                    <input
                        type="text"
                        name="alias"
                        value={state.alias}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Name the address (e.g., home, work)"
                    />
                </label>

                <label htmlFor="textarea" className="capitalize">
                    Description:
                </label>
                <textarea
                    id="textarea"
                    name="details"
                    value={state.details}
                    onChange={handleInputChange}
                    className="textarea textarea-info text-lg mt-2 w-full placeholder:text-zinc-500 text-gray-700 capitalize"
                    placeholder="Detailed address"
                ></textarea>

                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={state.phone}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Phone Number"
                    />
                </label>
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    City:
                    <input
                        type="text"
                        name="city"
                        value={state.city}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="City"
                    />
                </label>
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Postal Code:
                    <input
                        type="text"
                        name="postalCode"
                        value={state.postalCode}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Postal Code"
                    />
                </label>
            </Modal>

            {/* Address Card */}
            {isLoading ? (
                <div className="flex justify-between border-2 py-5 px-7 rounded-lg items-start">
                    {/* Skeleton for loading */}
                    <div className="flex justify-start flex-col gap-3">
                        <div className="bg-gray-200 animate-pulse w-24 h-6 rounded"></div>
                        <div className="bg-gray-200 animate-pulse w-40 h-6 rounded"></div>
                        <div className="bg-gray-200 animate-pulse w-20 h-6 rounded"></div>
                        <div className="bg-gray-200 animate-pulse w-28 h-6 rounded"></div>
                        <div className="bg-gray-200 animate-pulse w-16 h-6 rounded"></div>
                    </div>
                    <div className="flex justify-start items-center gap-5">
                        <div className="bg-gray-200 animate-pulse w-16 h-6 rounded"></div>
                        <div className="bg-gray-200 animate-pulse w-16 h-6 rounded"></div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between border-2 py-5 px-7 rounded-lg items-start">
                    <div className="flex justify-start flex-col gap-3">
                        <div className="flex gap-9">
                            <h3 className="capitalize font-medium text-zinc-400">Name :</h3>
                            <span className="text-zinc-800 text-sm">{address?.alias}</span>
                        </div>
                        <div className="capitalize font-medium flex gap-5">
                            <div className="text-zinc-400">Address :</div>
                            <div className="text-start">
                                <div className="font-normal">{address?.details}</div>
                            </div>
                        </div>
                        <div className="capitalize font-medium text-zinc-400">
                            Phone Number: <span className="text-zinc-600">{address?.phone}</span>
                        </div>
                        <div className="capitalize font-medium text-zinc-400">
                            City: <span className="text-zinc-500">{address?.city}</span>
                        </div>
                        {address?.postalCode && (
                            <div className="capitalize font-medium text-zinc-400">
                                Postal Code: <span className="text-zinc-600">{address?.postalCode}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-start items-center gap-5">
                        <div
                            onClick={(e) => handleShowDeleteModal(e, address?._id)}
                            className="cursor-pointer font-bold text-zinc-400 hover:text-zinc-600 underline"
                        >
                            Delete
                        </div>
                        <div
                            onClick={(e) => handleShowEditModal(e, address?._id)}
                            className="cursor-pointer font-bold text-zinc-400 hover:text-zinc-600 underline"
                        >
                            Edit
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserAddressCard;
