import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../../Redux/RTK Query/brands_slice";
import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";
import { useUpdateProductMutation } from "../../../Redux/RTK Query/products_slice";
import { IProduct, ISubCategory } from "../../../Interface";
import { useGetCategory_SubQuery } from "../../../Redux/RTK Query/subCategory_slice";
import Notify from "../../../Utils/UseNotifaction";

function UpdateProductHook() {
    // Fetch categories and handle loading/error states
    const { data: categories, isError: isCategoryError, isLoading: isCategoryLoading } = useGetCategoriesQuery();
    // Fetch brands and handle loading/error states
    const { data: brands, isError: isBrandError, isLoading: isBrandLoading } = useGetBrandsQuery();

    // Set up mutation for updating a product
    const [putProduct, { isLoading: isPosting }] = useUpdateProductMutation();

    // State variables for managing modal visibility and product details
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const handleCloseEditModal = () => setIsOpenEditModal(false); // Close modal function

    const [selectedEditProductId, setSelectedEditProductId] = useState<string>(); // Selected product ID for editing
    const [images, setImages] = useState<string[]>([]); // State for product images
    const [selectedOptions, setSelectedOptions] = useState<ISubCategory[]>([]); // Selected subcategories
    const [title, setTitle] = useState(""); // State for product title
    const [description, setDescription] = useState(""); // State for product description
    const [price, setPrice] = useState<string | number>(""); // State for product price
    const [discount, setDiscount] = useState<string | number>(""); // State for product discount
    const [quantity, setQuantity] = useState<string | number>(""); // State for product quantity
    const [category, setCategory] = useState<string>(""); // State for selected category
    const [brand, setBrand] = useState<string>(""); // State for selected brand
    const [options, setOptions] = useState<ISubCategory[]>([]); // State for available options based on category

    const [showColor, setShowColor] = useState(false); // State for toggling color options
    const [colors, setColors] = useState<string[]>([]); // State for selected colors

    // Fetch subcategories when the category changes
    const { data: category_sub } = useGetCategory_SubQuery(category); // Fetch subcategories based on selected category

    useEffect(() => {
        if (category_sub) {
            setOptions(category_sub.data); // Update options with fetched subcategories
        }
    }, [category_sub]);

    // Handle image upload from input
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map((file) =>
                URL.createObjectURL(file) // Create object URLs for selected files
            );
            setImages((prevImages) => prevImages.concat(fileArray)); // Append new images to existing images
        }
    };

    // Remove selected image
    const removeImage = (url: string) => {
        return () => {
            setImages((prevImages) => prevImages.filter((image) => image !== url)); // Filter out the removed image
            URL.revokeObjectURL(url); // Revoke object URL to free up memory
        };
    };

    // Handle selection of subcategories
    const handleSelect = (selectedItem: ISubCategory | ISubCategory[]) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newItems = Array.isArray(selectedItem) ? selectedItem : [selectedItem]; // Ensure selected items are in an array
            const updatedOptions = [...prevSelectedOptions]; // Create a copy of previous options
            newItems.forEach((item) => {
                // Add new items only if they are not already selected
                if (!updatedOptions.some(option => option._id === item._id)) {
                    updatedOptions.push(item);
                }
            });
            return updatedOptions; // Return updated selected options
        });
    };

    // Handle removal of selected subcategory
    const handleRemove = (removedItem: ISubCategory) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option._id !== removedItem._id) // Filter out the removed option
        );
    };

    // Handle input changes for various fields
    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value); // Update title state
    };
    const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value); // Update description state
    };
    const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value); // Update price state
    };
    const onChangeDiscount = (event: ChangeEvent<HTMLInputElement>) => {
        setDiscount(event.target.value); // Update discount state
    };
    const onChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value); // Update quantity state
    };

    // Handle category and brand selection changes
    const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value); // Update category state
    };
    const onChangeBrand = (event: ChangeEvent<HTMLSelectElement>) => {
        setBrand(event.target.value); // Update brand state
    };

    // Toggle color options display
    const onChangeColor = () => {
        setShowColor(!showColor); // Toggle the visibility of color options
    };

    // Handle color selection
    const handelChangeComplete = (color: { hex: string }) => {
        setColors([...colors, color.hex]); // Add selected color to colors state
        setShowColor(false); // Close color options
    };

    // Remove selected color
    const removeColor = (color: string) => {
        return () => {
            const newColor = colors.filter((e) => e !== color); // Filter out the removed color
            setColors(newColor); // Update colors state
        };
    };

    // Convert base64 string to a File object
    const convertBase64ToFile = async (base64: string, filename: string): Promise<File> => {
        const response = await fetch(base64); // Fetch the base64 string
        const blob = await response.blob(); // Convert to blob
        return new File([blob], filename, { type: blob.type }); // Return File object
    };

    // Handle product update
    const editProductHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        // Check if the selected product ID is provided
        if (!selectedEditProductId) {
            Notify({ msg: 'Product ID is missing!', type: 'error' }); // Notify error if ID is missing
            return;
        }

        const imgCover = await convertBase64ToFile(images[0], `${Math.random()}.png`); // Convert cover image to File

        // Prepare form data for submission
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("quantity", quantity.toString());
        formData.append("price", price.toString());
        formData.append("priceAfterDiscount", discount.toString());
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("imageCover", imgCover);

        // Convert all images to File objects and append to form data
        const itemImages = await Promise.all(
            images.map((img, index) =>
                convertBase64ToFile(img, `${Math.random()}-${index}.png`)
            )
        );
        itemImages.forEach((item) => formData.append("images", item)); // Append images to form data
        colors.forEach((color) => formData.append("availableColors", color)); // Append selected colors
        selectedOptions.forEach((item) => formData.append("subcategory", item._id)); // Append selected subcategories

        try {
            await putProduct({ id: selectedEditProductId, formData }).unwrap(); // Attempt to update product
            setIsOpenEditModal(false); // Close the modal
            Notify({ msg: 'The product was updated successfully', type: 'success' }); // Notify success
        } catch {
            Notify({ msg: 'There was a problem updating the product', type: 'error' }); // Notify error on failure
        }
    };

    // Handle showing the edit modal with pre-filled product data
    const handleShowEditModal = (e: FormEvent<HTMLButtonElement>, product: IProduct) => {
        e.preventDefault(); // Prevent default button behavior
        setSelectedEditProductId(product._id); // Set selected product ID
        setIsOpenEditModal(true); // Open the edit modal
        setTitle(product.title); // Set title
        setDescription(product.description); // Set description
        setPrice(product.price); // Set price
        setDiscount(product.priceAfterDiscount); // Set discount
        setQuantity(product.quantity); // Set quantity
        setImages(product.images); // Set images
    };

    // Return state and handlers for use in the component

    return [categories, isCategoryError, isCategoryLoading, brands, isBrandError, isBrandLoading,
        isPosting, isOpenEditModal, handleCloseEditModal, handleShowEditModal, images, title, description, price,
        discount, quantity, category, brand, options, showColor, colors, handleImageUpload, removeImage,
        handleSelect, handleRemove, onChangeName, onChangeDescription, onChangePrice, onChangeDiscount,
        onChangeQuantity, onChangeCategory, onChangeBrand, onChangeColor,
        handelChangeComplete, removeColor, editProductHandler] as const
}

export default UpdateProductHook
