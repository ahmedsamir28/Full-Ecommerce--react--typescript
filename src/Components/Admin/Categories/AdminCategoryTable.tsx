import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { ICategory } from "../../../Interface";
import Button from "../../../UI-items/Button";
import Image from "../../../UI-items/Image";
import Modal from "../../../UI-items/Modal";
import GetCategoryTableHook from "../../../Hooks/Admin/Category/Get_Category_Table_Hook";
import DeleteCategoryHook from "../../../Hooks/Admin/Category/Delete_Category_Hook";
import Notify from "../../../Utils/UseNotifaction";
import { useUpdateCategoryMutation } from "../../../Redux/RTK Query/categories_slice";

function AdminCategoryTable() {
    const [data, isError, isLoading, formatDate] = GetCategoryTableHook();
    const [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isDeleting, removeCategoryHandler] = DeleteCategoryHook();
    const [putCategory, { isLoading: isPosting, isSuccess: updateIsSuccess }] = useUpdateCategoryMutation();
    
    const [selectedEditCategoryId, setSelectedEditCategoryId] = useState<string | null>(null);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [img, setImg] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState('');

    const handleCloseEditModal = () => setIsOpenEditModal(false);

    const handleShowEditModal = (e: FormEvent<HTMLButtonElement>, category: ICategory) => {
        e.preventDefault();
        setSelectedEditCategoryId(category._id);
        setName(category.name);
        setImg(category.image);
        setIsOpenEditModal(true);
    };

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (img) URL.revokeObjectURL(img); // Revoke previous object URL to avoid memory leaks
            const newImgUrl = URL.createObjectURL(file);
            setImg(newImgUrl);
            setSelectedFile(file);
        }
    };

    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const editCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim() === "" || selectedFile === null) {
            Notify({ msg: 'Please complete the data', type: 'warn' });
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        try {
            if (selectedEditCategoryId) {
                await putCategory({ id: selectedEditCategoryId, formData }).unwrap();
                setIsOpenEditModal(false);
                resetForm();
                Notify({ msg: 'The update was completed successfully', type: 'success' });
            }
        } catch {
            Notify({ msg: 'There is a problem with the update process', type: 'error' });
        }
    };

    const resetForm = () => {
        setName('');
        setSelectedFile(null);
        setImg('');
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
                title="Confirm deletion"
                add={isDeleting ? 'loading...' : 'remove category'}
                btnClass="error"
            >
                <p>Are you sure about the category deletion process?</p>
            </Modal>

            {/* Modal for editing the category */}
            <Modal
                isOpen={isOpenEditModal}
                closeModal={handleCloseEditModal}
                onSubmit={editCategoryHandler}
                title="Edit Category"
                add={isPosting ? 'Loading...' : 'edit category'}
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

            <div className="overflow-x-auto border-2 rounded-lg xl:w-[900px] 2xl:w-[1000px]">
                {!isLoading && isError && <p className="text-center text-error">There is no data</p>}
                <table className="table">
                    <thead>
                        <tr>
                            <th className="capitalize font-extrabold text-black text-sm"></th>
                            <th className="capitalize font-extrabold text-black text-sm">Category Title</th>
                            <th className="capitalize font-extrabold text-black text-sm">Created At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length:  data?.data.length || 5 }, (_, index) => (
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
                            data.data.map((category: ICategory, index) => (
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
    );
}

export default AdminCategoryTable;
