import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { usePostSubCategoryMutation } from "../../../Redux/RTK Query/subCategory_slice";
import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";
import Notify from "../../../Utils/UseNotifaction";

function AddSubCategoryHook() {
    // State variables for managing modal visibility and input data
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false); // Modal visibility state
    const [category, setCategory] = useState<string>(''); // Selected category state
    const [name, setName] = useState<string>(''); // Subcategory name state

    // Set up mutation for posting a new subcategory
    const [postSubCategory, { isLoading: isPosting }] = usePostSubCategoryMutation();
    // Fetch categories and handle loading/error states
    const { data: categories, isError, isLoading } = useGetCategoriesQuery();

    // Handle closing the confirmation modal
    const handleCloseModal = () => setIsOpenConfirmModal(false);
    // Handle showing the confirmation modal
    const handleShowModal = () => setIsOpenConfirmModal(true);

    // Handle changes in the subcategory name input
    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value); // Update name state
    }, []);

    // Handle changes in the category selection
    const onChangeCategory = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value); // Update category state
    }, []);

    // Handle form submission to add a new subcategory
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate input fields
        if (name.trim() === "" || category === '') {
            Notify({ msg: 'Please complete the data', type: 'warn' }); // Notify user to complete required fields
            return;
        }

        // Attempt to post the new subcategory
        try {
            await postSubCategory({ name, category }).unwrap(); // Send the subcategory data to the server
            setIsOpenConfirmModal(false); // Close the modal on successful addition
            resetForm(); // Reset form fields
            Notify({ msg: 'The addition was completed successfully', type: 'success' }); // Notify success
        } catch {
            Notify({ msg: 'There is a problem with the addition process', type: 'error' }); // Notify error on failure
        }
    };

    // Reset form fields to initial state
    const resetForm = () => {
        setName(''); // Clear name field
        setCategory(''); // Clear category selection
    };

    // Return state and handlers for use in the component
    return [isOpenConfirmModal,name,category,isPosting ,categories,isError,isLoading,handleCloseModal,handleShowModal,onChangeName,onChangeCategory,handleSubmit] as const 
}

export default AddSubCategoryHook
