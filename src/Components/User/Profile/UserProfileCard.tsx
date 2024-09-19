import Modal from "../../../UI-items/Modal";
import UpdateUserDataHook from "../../../Hooks/User/LoggedUser/Update_User_Data_Hook";

function UserProfileCard() {
const [isOpenEditModal ,state, formErrors, handleChange,handleCloseEditModal,handleShowEditModal,data,isFetchingUser,isUpdating,editUserDataHandler]  = UpdateUserDataHook()

    return (
        <>
            {/* Modal for editing user data */}
            <Modal
                isOpen={isOpenEditModal}
                closeModal={handleCloseEditModal}
                onSubmit={editUserDataHandler}
                add={isUpdating ? 'Saving...' : 'Save Edit'}
                title="Edit Profile"
            >
                {formErrors && <div className="text-red-500 mb-3">{formErrors}</div>}

                <label htmlFor="name" className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Name:
                    <input
                        id="name"
                        type="text"
                        value={state.name}
                        name="name"
                        onChange={handleChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="User Name"
                    />
                </label>

                <label htmlFor="phone" className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Phone:
                    <input
                        id="phone"
                        type="text"
                        value={state.phone}
                        name="phone"
                        onChange={handleChange}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Phone Number"
                    />
                </label>

                <label htmlFor="email" className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Email:
                    <input
                        id="email"
                        type="email"
                        value={state.email}
                        name="email"
                        onChange={handleChange}
                        className="grow placeholder:text-zinc-500 text-gray-700"
                        placeholder="Email"
                    />
                </label>
            </Modal>
            {
                isFetchingUser ? (
                    <div className="flex justify-between border-2 py-5 px-7 rounded-lg items-start animate-pulse">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                            </div>
                            <div className="capitalize font-medium flex gap-2">
                                <div className="h-4 bg-gray-300 rounded w-32"></div>
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                                <div className="h-4 bg-gray-200 rounded w-40"></div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-5">
                            <div className="h-4 bg-gray-300 rounded w-12"></div>
                        </div>
                    </div>

                ) : (<div className="flex justify-between border-2 py-5 px-7 rounded-lg items-start">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            <h3 className="font-medium text-zinc-400">Name :</h3>
                            <span className="text-zinc-800 text-sm">{data?.data.name}</span>
                        </div>
                        <div className="capitalize font-medium flex gap-2">
                            <div className="text-zinc-400">Phone Number :</div>
                            <div className="text-start ">{data?.data.phone}</div>
                        </div>
                        <div className="font-medium text-zinc-400">
                            Email : <span className="text-zinc-600 ml-2">{data?.data.email}</span>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-5">
                        <div
                            onClick={handleShowEditModal}
                            className="cursor-pointer font-bold text-zinc-400 hover:text-zinc-600 underline"
                        >
                            Edit
                        </div>
                    </div>
                </div>)
            }
            {/* User data display */}

        </>
    );
}

export default UserProfileCard;
