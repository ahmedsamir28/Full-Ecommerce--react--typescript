import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import DeleteSubCategoryHook from "../../../Hooks/Admin/SubCategory/Delete_SubCategory_Hook";
import GetSubCategoryTableHook from "../../../Hooks/Admin/SubCategory/Get_SubCategory_Table_Hook";
import { ISubCategory } from "../../../Interface";
import Button from "../../../UI-items/Button"
import Modal from "../../../UI-items/Modal";
import Notify from "../../../Utils/UseNotifaction";
import { useUpdateSubCategoryMutation } from "../../../Redux/RTK Query/subCategory_slice";

function AdminSubcategoryTable() {
    const [data, isError, isLoading, formatDate] = GetSubCategoryTableHook();
    const [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isDeleting, removeCategoryHandler] = DeleteSubCategoryHook();


    const [putSubCategory, { isLoading: isPosting, isSuccess: updateIsSuccess }] = useUpdateSubCategoryMutation();

    const [selectedEditSubCategoryId, setSelectedEditSubCategoryId] = useState<string | null>(null);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [name, setName] = useState('');

    const handleCloseEditModal = () => setIsOpenEditModal(false);

    const handleShowEditModal = (e: FormEvent<HTMLButtonElement>, category: ISubCategory) => {
        e.preventDefault();
        setSelectedEditSubCategoryId(category._id);
        setName(category.name);
        setIsOpenEditModal(true);
    };

    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const editSubCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const sanitized_name = name.trim();
        if (!sanitized_name) {
            Notify({ msg: 'The name cannot be empty.', type: 'error' });
            return;
        }
    
        try {
            if (selectedEditSubCategoryId) {
                await putSubCategory({ id: selectedEditSubCategoryId, name: sanitized_name }).unwrap();
                setIsOpenEditModal(false);
                resetForm();
                Notify({ msg: 'The update was completed successfully', type: 'success' });
            }
        } catch (error) {
            Notify({ msg: 'There was an error updating the subCategory', type: 'error' });
            console.error("Update Error:", error);
        }
    };
    

    const resetForm = () => {
        setName('');
        setSelectedEditSubCategoryId(null);
    };

    useEffect(() => {
        if (updateIsSuccess) {
            resetForm();
        }
    }, [updateIsSuccess]);

    return (
        <>
            {/* Modal for removing the category */}
            <Modal
                isOpen={isOpenDeleteModal}
                closeModal={handleCloseDeleteModal}
                onSubmit={removeCategoryHandler}
                title="Confirm Deletion"
                add={isDeleting ? 'Loading...' : 'Remove Category'}
                btnClass="error"
            >
                <p>Are you sure you want to delete this category?</p>
            </Modal>

            {/* Modal for editing the category */}
            <Modal
                isOpen={isOpenEditModal}
                closeModal={handleCloseEditModal}
                onSubmit={editSubCategoryHandler}
                title="Edit Category"
                add={isPosting ? 'Loading...' : 'Edit Category'}
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Category Title:
                    <input
                        onChange={onChangeName}
                        type="text"
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Type here"
                        value={name}
                    />
                </label>
            </Modal>

            {/* Display data or error message */}
            {!isLoading && isError && (
                <p className="text-center text-error">Failed to load data</p>
            )}

            {/* Table displaying subcategories */}
            <div className="overflow-x-auto border-2 rounded-lg xl:w-[900px] 2xl:w-[1000px]">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="capitalize font-extrabold text-black text-sm"></th>
                            <th className="capitalize font-extrabold text-black text-sm">Subcategory Title</th>
                            <th className="capitalize font-extrabold text-black text-sm">Created At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }, (_, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <div className="h-4 w-10 bg-gray-300 animate-pulse mx-auto"></div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 bg-gray-300 animate-pulse rounded-full"></div>
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
                            data?.data.map((subCategory: ISubCategory, index: number) => (
                                <tr key={subCategory._id}>
                                    <td className="text-center">
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="font-bold">{subCategory.name}</div>
                                        </div>
                                    </td>
                                    <td>{formatDate(subCategory.createdAt)}</td>
                                    <td className="flex items-center justify-end gap-5">
                                        <Button
                                            onClick={(e) => handleShowDeleteModal(e, subCategory._id)}
                                            className="btn btn-outline btn-error capitalize"
                                        >
                                            <i className="fa-regular fa-trash-can"></i> Delete
                                        </Button>
                                        <Button
                                            onClick={(e) => handleShowEditModal(e, subCategory)}
                                            className="btn btn-outline btn-warning capitalize"
                                        >
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

export default AdminSubcategoryTable
