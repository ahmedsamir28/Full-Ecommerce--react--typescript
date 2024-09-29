import AddUserAddressHook from "../../../Hooks/User/Addresses/Add_User_Address_Hook";
import Button from "../../../UI-items/Button";
import Modal from "../../../UI-items/Modal";

function UserAddAddress() {
    const [isOpenConfirmModal, handleCloseModal, handleShowModal, state, isLoading, handleFormSubmit, handleInputChange]  = AddUserAddressHook()
    return (
        <div className="flex items-center justify-center">
            <Button onClick={handleShowModal} className="w-46 btn btn-outline capitalize btn-success" disabled={isLoading}>
                {isLoading ? 'Loading...' : <><i className="fa-solid fa-plus text-lg"> </i> Add New Address</>}
            </Button>


            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={handleCloseModal}
                title="Add Address"
                add="Add Address"
                onSubmit={handleFormSubmit}
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    The address:
                    <input
                        type="text"
                        name="alias"
                        value={state.alias}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Naming the address, e.g., (home - work)"
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
                        placeholder="city"
                    />
                </label>
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    postalCode:
                    <input
                        type="text"
                        name="postalCode"
                        value={state.postalCode}
                        onChange={handleInputChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Postal code"
                    />
                </label>
            </Modal>
        </div>
    );
}

export default UserAddAddress;
