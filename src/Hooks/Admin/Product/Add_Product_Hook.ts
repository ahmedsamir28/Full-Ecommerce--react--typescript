import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../../Redux/RTK Query/brands_slice";
import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";
import { usePostProductMutation } from "../../../Redux/RTK Query/products_slice";
import { ISubCategory } from "../../../Interface";
import { useGetCategory_SubQuery } from "../../../Redux/RTK Query/subCategory_slice";
import Notify from "../../../Utils/UseNotifaction";

function AddProductHook() {
    // Fetch categories and brands
    const { data: categories, isError: isCategoryError, isLoading: isCategoryLoading } = useGetCategoriesQuery();
    const { data: brands, isError: isBrandError, isLoading: isBrandLoading } = useGetBrandsQuery();

    // Post product mutation hook from RTK Query
    const [postProduct] = usePostProductMutation();

    // Modal state management
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

    // Form state management
    const [images, setImages] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<ISubCategory[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<string | number>("");
    const [discount, setDiscount] = useState<string | number>("");
    const [quantity, setQuantity] = useState<string | number>("");
    const [category, setCategory] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [options, setOptions] = useState<ISubCategory[]>([]);

    // Color management
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState<string[]>([]);

    // Fetch subcategories when category changes
    const { data: category_sub } = useGetCategory_SubQuery(category, { skip: !category });
    useEffect(() => {
        if (category_sub) {
            setOptions(category_sub.data);
        }
    }, [category_sub]);

    // Image upload handling
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prevImages) => prevImages.concat(fileArray));
        }
    };

    // Remove image from preview
    const removeImage = (url: string) => () => {
        setImages((prevImages) => prevImages.filter((image) => image !== url));
        URL.revokeObjectURL(url); // Prevent memory leaks
    };

    // Select subcategories for the product
    const handleSelect = (selectedItem: ISubCategory | ISubCategory[]) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newItems = Array.isArray(selectedItem) ? selectedItem : [selectedItem];
            const updatedOptions = [...prevSelectedOptions];
            newItems.forEach((item) => {
                if (!updatedOptions.some(option => option._id === item._id)) {
                    updatedOptions.push(item);
                }
            });
            return updatedOptions;
        });
    };

    // Remove selected subcategory
    const handleRemove = (removedItem: ISubCategory) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option._id !== removedItem._id)
        );
    };

    // Form input handlers
    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);
    const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => setPrice(event.target.value);
    const onChangeDiscount = (event: ChangeEvent<HTMLInputElement>) => setDiscount(event.target.value);
    const onChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => setQuantity(event.target.value);
    const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => setCategory(event.target.value);
    const onChangeBrand = (event: ChangeEvent<HTMLSelectElement>) => setBrand(event.target.value);

    // Toggle color picker
    const onChangeColor = () => setShowColor(!showColor);
    
    // Add color when color picker is selected
    const handelChangeComplete = (color: { hex: string }) => {
        setColors([...colors, color.hex]);
        setShowColor(false);
    };

    // Remove selected color
    const removeColor = (color: string) => () => {
        setColors(colors.filter((e) => e !== color));
    };

    // Convert base64 image to file for upload
    const convertBase64ToFile = async (base64: string, filename: string): Promise<File> => {
        const response = await fetch(base64);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    };

    // Submit product form
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !description || !price || !category || !brand) {
            Notify({ msg: 'Please complete the data', type: 'warn' });
            return;
        }

        const imgCover = await convertBase64ToFile(images[0], `${Math.random()}.png`);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("quantity", quantity.toString());
        formData.append("price", price.toString());
        formData.append("priceAfterDiscount", discount.toString());
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("imageCover", imgCover);

        const itemImages = await Promise.all(images.map((img, index) =>
            convertBase64ToFile(img, `${Math.random()}-${index}.png`)
        ));
        itemImages.map((item) => formData.append("images", item));
        colors.map((color) => formData.append("availableColors", color));
        selectedOptions.map((item) => formData.append("subcategory", item._id));

        try {
            await postProduct(formData).unwrap();
            setIsOpenConfirmModal(false);
            resetForm();
            Notify({ msg: 'The addition was completed successfully', type: 'success' });
        } catch {
            Notify({ msg: 'There is a problem with the addition process', type: 'error' });
        }
    };

    // Reset form fields
    const resetForm = () => {
        setImages([]);
        setTitle('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setQuantity('');
        setCategory('');
        setBrand('');
        setSelectedOptions([]);
        setColors([]);
    };

    // Return the required data and handlers
    return [
        categories, isCategoryError, isCategoryLoading,
        brands, isBrandError, isBrandLoading,
        isOpenConfirmModal, handleCloseModal, handleShowModal, images,
        title, description, price, discount, quantity, category, brand, options, showColor, colors,
        handleImageUpload, removeImage, handleSelect, handleRemove, onChangeName, onChangeDescription,
        onChangePrice, onChangeDiscount, onChangeQuantity, onChangeCategory, onChangeBrand, onChangeColor,
        handelChangeComplete, removeColor, handleSubmit
    ] as const;
}

export default AddProductHook;
