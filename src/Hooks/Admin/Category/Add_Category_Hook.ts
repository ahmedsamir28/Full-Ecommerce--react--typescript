import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { usePostCategoryMutation } from "../../../Redux/RTK Query/categories_slice";
import Notify from "../../../Utils/UseNotifaction";

function AddCategoryHook() {
    // State for controlling the confirmation modal visibility
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    
    // State for storing the image URL and file selected by the user
    const [img, setImg] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    // State for storing the category name input
    const [name, setName] = useState('');

    // Functions to handle the opening and closing of the confirmation modal
    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

    // RTK Query mutation hook for posting a new category
    const [postCategory, { isLoading: isPosting, isSuccess }] = usePostCategoryMutation();

    // Handler for image file selection and setting up image preview
    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Revoke the previous image URL to prevent memory leaks
            if (img) URL.revokeObjectURL(img);
            const newImgUrl = URL.createObjectURL(file); // Create a URL for the selected image
            setImg(newImgUrl); // Set the new image URL for preview
            setSelectedFile(file); // Store the selected file for later submission
        }
    }

    // Handler for category name input change
    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    // Form submission handler to post a new category
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if the name and image are provided
        if (name.trim() === "" || selectedFile === null) {
            Notify({ msg: 'Please complete the data', type: 'warn' }); // Notify if data is incomplete
            return;
        }

        // Prepare form data for submission
        const formData = new FormData();
        formData.append("name", name); // Append category name
        if (selectedFile) {
            formData.append("image", selectedFile); // Append selected image file if available
        }

        try {
            // Post the new category using the mutation
            await postCategory(formData).unwrap();
            setIsOpenConfirmModal(false); // Close the modal
            resetForm(); // Reset form after successful submission
            Notify({ msg: 'The addition was completed successfully', type: 'success' }); // Notify success
        } catch {
            Notify({ msg: 'There is a problem with the addition process', type: 'error' }); // Notify error
        }
    };

    // Function to reset the form fields after submission
    const resetForm = () => {
        setName(''); // Reset name input
        setSelectedFile(null); // Reset file input
        setImg(''); // Reset image preview
    };

    // Effect to reset form when the category is successfully added
    useEffect(() => {
        if (isSuccess) {
            resetForm(); // Reset form if the post request was successful
        }
    }, [isSuccess]);

    // Returning state and functions to be used in the component
    return [isOpenConfirmModal, img, name, handleCloseModal, handleShowModal, onImageChange, onChangeName, handleSubmit, isPosting] as const;
}

export default AddCategoryHook;
