import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Button from "../../../UI-items/Button";
import Modal from "../../../UI-items/Modal";
import { usePostSubCategoryMutation } from "../../../Redux/RTK Query/subCategory_slice";
import Notify from "../../../Utils/UseNotifaction";
import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";
import { IData } from "../../../Interface";

function AdminAddSubCategory() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [postSubCategory, { isLoading: isPosting }] = usePostSubCategoryMutation();
    const { data: categories, isError, isLoading } = useGetCategoriesQuery();

    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const onChangeCategory = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim() === "" || category === '') {
            Notify({ msg: 'Please complete the data', type: 'warn' });
            return;
        }

        try {
            await postSubCategory({ name, category }).unwrap();
            setIsOpenConfirmModal(false);
            resetForm();
            Notify({ msg: 'The addition was completed successfully', type: 'success' });
        } catch {
            Notify({ msg: 'There is a problem with the addition process', type: 'error' });
        }
    };

    const resetForm = () => {
        setName('');
        setCategory('');
    };

    return (
        <div className="flex items-center justify-center">
            <Button
                onClick={handleShowModal}
                className="w-46 btn btn-outline capitalize btn-success">
                <i className="fa-solid fa-plus text-lg"></i>
                Add SubCategory
            </Button>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={handleCloseModal}
                onSubmit={handleSubmit}
                title="Add Sub-Category"
                add={isPosting ? 'Loading...' : 'Add Sub-Category'}
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Sub-Category:
                    <input
                        type="text"
                        value={name}
                        onChange={onChangeName}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Type here" />
                </label>
                <select
                    value={category}
                    onChange={onChangeCategory}
                    className="select select-info w-full text-lg capitalize text-zinc-600">
                    <option value="" disabled>Main Category</option>
                    {!isLoading && !isError && categories && categories.data.map((category: IData) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </Modal>
        </div>
    );
}

export default AdminAddSubCategory;
