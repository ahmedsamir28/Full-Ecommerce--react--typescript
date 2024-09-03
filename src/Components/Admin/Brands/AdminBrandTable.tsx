import DeleteBrandHook from "../../../Hooks/Admin/Brand/Delete_Brand_Hook";
import GetBrandTableHook from "../../../Hooks/Admin/Brand/Get_Brand_Table_Hook";
import UpdateBrandHook from "../../../Hooks/Admin/Brand/Update_Brand_Hook";
import { IData } from "../../../Interface";
import Button from "../../../UI-items/Button"
import Image from "../../../UI-items/Image"
import Modal from "../../../UI-items/Modal";

function AdminBrandTable() {
    const [data, isError, isLoading, formatDate] = GetBrandTableHook();
    const [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isDeleting, removeCategoryHandler] = DeleteBrandHook();
    const [isOpenEditModal, handleCloseEditModal, editCategoryHandler, isPosting, onImageChange, img, onChangeName, name, handleShowEditModal] = UpdateBrandHook()

    return (
        <>
            {/* Modal for removing the category */}
            <Modal
                isOpen={isOpenDeleteModal}
                closeModal={handleCloseDeleteModal}
                onSubmit={removeCategoryHandler}
                title="Confirm deletion"
                add={isDeleting ? 'loading...' : 'remove brand'}
                btnClass="error"
            >
                <p>Are you sure about the brand deletion process?</p>
            </Modal>

            {/* Modal for editing the category */}
            <Modal
                isOpen={isOpenEditModal}
                closeModal={handleCloseEditModal}
                onSubmit={editCategoryHandler}
                title="Edit Category"
                add={isPosting ? 'Loading...' : 'edit brand'}
            >
                <div className="flex gap-5 items-center justify-start border-2 rounded-lg py-2 scroll">
                    <div>
                        <label htmlFor="upload-photo">
                            <div className="py-3 px-3 border-r-2 cursor-pointer text-center">
                                <span className="text-xl"><i className="fa-regular fa-images"></i></span>
                                <div className="capitalize text-blue-700 mt-3">Click to Upload</div>
                            </div>
                        </label>
                        <input
                            type="file"
                            id="upload-photo"
                            onChange={onImageChange}
                            className="hidden"
                        />
                    </div>
                    <div className="flex space-x-2 items-center">
                        <Image url={img} alt="" className="h-24 rounded-md cursor-pointer" />
                    </div>
                </div>
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Brand Title:
                    <input
                        onChange={onChangeName}
                        type="text"
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Type here"
                        value={name}
                    />
                </label>
            </Modal>

            {!isLoading && isError && <p className="text-center text-error">There is no data</p>}
            <div className="overflow-x-auto border-2 rounded-lg xl:w-[900px] 2xl:w-[1000px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="">
                            <th className="capitalize font-extrabold text-black text-sm"></th>
                            <th className="capitalize font-extrabold text-black text-sm">brand title</th>
                            <th className="capitalize font-extrabold text-black text-sm">created at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: data?.data.length || 5 }, (_, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <div className="h-4 w-10 bg-gray-300 animate-pulse mx-auto"></div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <div className="h-full w-full bg-gray-300 animate-pulse rounded-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="h-4 w-32 bg-gray-300 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-4 w-24 bg-gray-300 animate-pulse"></div>
                                    </td>
                                    <td className="flex items-center justify-end gap-5">
                                        <div className="h-8 w-20 bg-gray-300 animate-pulse"></div>
                                        <div className="h-8 w-20 bg-gray-300 animate-pulse"></div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            data &&
                            data.data.map((category: IData, index) => (
                                <tr key={category._id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <Image
                                                        url={category.image}
                                                        alt="Category Image"
                                                        className="border-2"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{category.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {formatDate(category.createdAt)}
                                    </td>
                                    <td className="flex items-center justify-end gap-5">
                                        <Button
                                            onClick={(e) => handleShowDeleteModal(e, category._id)}
                                            className="btn btn-outline btn-error capitalize"
                                        >
                                            <i className="fa-regular fa-trash-can"></i> delete
                                        </Button>
                                        <Button
                                            onClick={(e) => handleShowEditModal(e, category)}
                                            className="btn btn-outline btn-warning capitalize"
                                        >
                                            <i className="fa-regular fa-pen-to-square"></i> update
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminBrandTable
