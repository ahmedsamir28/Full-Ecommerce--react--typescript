import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { usePostSubCategoryMutation } from "../../../Redux/RTK Query/subCategory_slice";
import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";
import Notify from "../../../Utils/UseNotifaction";

function useAddSubCategory() {
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
        } catch (error) {
            Notify({ msg: 'There is a problem with the addition process', type: 'error' });
            console.error("Error adding subcategory:", error); // Log the error for debugging
        }
    };

    const resetForm = () => {
        setName('');
        setCategory('');
    };

    return {
        isOpenConfirmModal,
        name,
        category,
        isPosting,
        categories,
        isError,
        isLoading,
        handleCloseModal,
        handleShowModal,
        onChangeName,
        onChangeCategory,
        handleSubmit,
    };
}

export default useAddSubCategory;
