import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../../Redux/RTK Query/categories_slice";
import { IData } from "../../../Interface";
import Notify from "../../../Utils/UseNotifaction";

function UpdateCategoryHook() {
    // RTK Query hook to update category, with isLoading and isSuccess states
    const [putCategory, { isLoading: isPosting, isSuccess: updateIsSuccess }] = useUpdateCategoryMutation();

    // State to track the selected category ID for editing
    const [selectedEditCategoryId, setSelectedEditCategoryId] = useState<string | null>(null);
    // State to handle modal visibility
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    // State for the category image and file
    const [img, setImg] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // State for the category name
    const [name, setName] = useState('');

    // Close the edit modal
    const handleCloseEditModal = () => setIsOpenEditModal(false);

    // Show the edit modal and populate the selected category's data
    const handleShowEditModal = (e: FormEvent<HTMLButtonElement>, category: IData) => {
        e.preventDefault();
        setSelectedEditCategoryId(category._id);  // Set the category ID for editing
        setName(category.name);  // Set the category name in the form
        setImg(category.image);  // Set the image
        setIsOpenEditModal(true);  // Open the modal
    };

    // Handle image change, create an object URL for preview, and set the selected file
    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (img) URL.revokeObjectURL(img);  // Revoke previous object URL to avoid memory leaks
            const newImgUrl = URL.createObjectURL(file);  // Create a new object URL for the image
            setImg(newImgUrl);  // Set the new image URL for preview
            setSelectedFile(file);  // Set the selected file for upload
        }
    };

    // Handle input change for the category name
    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);  // Update the category name state
    }, []);

    // Submit handler to edit the category
    const editCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Prepare form data to send to the server
        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) {
            formData.append("image", selectedFile);  // Append image file if selected
        }

        try {
            if (selectedEditCategoryId) {
                // Call the RTK Query mutation to update the category
                await putCategory({ id: selectedEditCategoryId, formData }).unwrap();
                setIsOpenEditModal(false);  // Close the modal on success
                resetForm();  // Reset form fields
                Notify({ msg: 'The update was completed successfully', type: 'success' });  // Show success notification
            }
        } catch {
            Notify({ msg: 'There is a problem with the update process', type: 'error' });  // Show error notification on failure
        }
    };

    // Reset form fields after the update
    const resetForm = () => {
        setName('');  // Clear the name field
        setSelectedFile(null);  // Clear the selected file
        setImg('');  // Clear the image preview
    };

    // If the update is successful, reset the form
    useEffect(() => {
        if (updateIsSuccess) {
            resetForm();
        }
    }, [updateIsSuccess]);

    // Return all necessary state and functions for handling the update process
    return [isOpenEditModal, handleCloseEditModal, editCategoryHandler, isPosting, onImageChange, img, onChangeName, name, handleShowEditModal] as const;
}

export default UpdateCategoryHook;
