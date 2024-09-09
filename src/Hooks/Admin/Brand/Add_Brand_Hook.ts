import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { usePostBrandMutation } from "../../../Redux/RTK Query/brands_slice";

function AddBrandHook() {
    // State to manage the visibility of the confirmation modal
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    // State to store the image preview URL and the selected file
    const [img, setImg] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // State to store the brand name
    const [name, setName] = useState('');

    // Function to close the confirmation modal
    const handleCloseModal = () => setIsOpenConfirmModal(false);

    // Function to show the confirmation modal
    const handleShowModal = () => setIsOpenConfirmModal(true);

    // RTK Query mutation for posting a new brand
    const [postBrand, { isLoading: isPosting, isSuccess }] = usePostBrandMutation();

    // Handler to update the image preview and store the selected file
    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Revoke the previous image URL to avoid memory leaks
            if (img) URL.revokeObjectURL(img);
            const newImgUrl = URL.createObjectURL(file);
            setImg(newImgUrl); // Set the new image preview URL
            setSelectedFile(file); // Set the selected file
        }
    }

    // Handler to update the brand name input
    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    // Function to handle the form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate if name is empty or no image is selected
        if (name.trim() === "" || selectedFile === null) {
            Notify({ msg: 'Please complete the data', type: 'warn' });
            return;
        }

        // Create a FormData object to store form data for the API request
        const formData = new FormData();
        formData.append("name", name); // Append the brand name
        if (selectedFile) {
            formData.append("image", selectedFile); // Append the selected image file
        }

        try {
            // Submit the form data to the server using the RTK mutation
            await postBrand(formData).unwrap();
            setIsOpenConfirmModal(false); // Close the confirmation modal on success
            resetForm(); // Reset the form fields after submission
            Notify({ msg: 'The addition was completed successfully', type: 'success' });
        } catch {
            // Handle any errors during submission
            Notify({ msg: 'There is a problem with the addition process', type: 'error' });
        }
    };

    // Function to reset the form fields
    const resetForm = () => {
        setName(''); // Clear the brand name input
        setSelectedFile(null); // Reset the selected file
        setImg(''); // Clear the image preview URL
    };

    // Effect to reset the form when a brand is successfully added
    useEffect(() => {
        if (isSuccess) {
            resetForm(); // Reset the form when the mutation is successful
        }
    }, [isSuccess]);

    // Return all the necessary states and handlers
    return [isOpenConfirmModal, img, name, handleCloseModal, handleShowModal, onImageChange, onChangeName, handleSubmit, isPosting] as const;
}

export default AddBrandHook;
