import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { IData } from "../../../Interface";
import { useUpdateBrandMutation } from "../../../Redux/RTK Query/brands_slice";

function UpdateBrandHook() {
    // Hook for the RTK Query mutation to update a brand
    const [putBrand, { isLoading: isPosting, isSuccess: updateIsSuccess }] = useUpdateBrandMutation();

    // State to store the selected brand's ID for editing
    const [selectedEditCategoryId, setSelectedEditCategoryId] = useState<string | null>(null);
    
    // Modal open/close state
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    
    // State to store the image URL and file object for preview and upload
    const [img, setImg] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    // State to store the brand name
    const [name, setName] = useState('');

    // Function to close the edit modal
    const handleCloseEditModal = () => setIsOpenEditModal(false);

    // Function to open the edit modal with selected brand data
    const handleShowEditModal = (e: FormEvent<HTMLButtonElement>, category: IData) => {
        e.preventDefault();
        setSelectedEditCategoryId(category._id); // Set the ID of the brand being edited
        setName(category.name); // Set the brand's name
        setImg(category.image); // Set the brand's image
        setIsOpenEditModal(true); // Open the modal
    };

    // Function to handle the image selection and preview
    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (img) URL.revokeObjectURL(img); // Revoke previous image URL to prevent memory leaks
            const newImgUrl = URL.createObjectURL(file); // Create a URL for the new image
            setImg(newImgUrl); // Set the new image URL for preview
            setSelectedFile(file); // Store the selected file for upload
        }
    };

    // Function to handle name changes for the brand
    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    // Function to handle the update (edit) form submission
    const editCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name); // Append the name to the form data
        if (selectedFile) {
            formData.append("image", selectedFile); // Append the image file if selected
        }

        try {
            if (selectedEditCategoryId) {
                // If there's a category ID, update the brand using the mutation
                await putBrand({ id: selectedEditCategoryId, formData }).unwrap();
                setIsOpenEditModal(false); // Close the modal
                resetForm(); // Reset the form fields
                Notify({ msg: 'The update was completed successfully', type: 'success' }); // Show success notification
            }
        } catch {
            Notify({ msg: 'There is a problem with the update process', type: 'error' }); // Show error notification
        }
    };

    // Function to reset the form fields after submission or cancelation
    const resetForm = () => {
        setName('');
        setSelectedFile(null);
        setImg('');
    };

    // Effect to reset the form whenever the update is successful
    useEffect(() => {
        if (updateIsSuccess) {
            resetForm();
        }
    }, [updateIsSuccess]);

    // Return necessary states and functions to be used in the component
    return [isOpenEditModal, handleCloseEditModal, editCategoryHandler, isPosting, onImageChange, img, onChangeName, name, handleShowEditModal] as const;
}

export default UpdateBrandHook;
