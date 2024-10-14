import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../../Redux/RTK Query/brands_slice";
import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";
import { usePostProductMutation } from "../../../Redux/RTK Query/products_slice";
import { ISubCategory } from "../../../Interface";
import { useGetCategory_SubQuery } from "../../../Redux/RTK Query/subCategory_slice";
import Notify from "../../../Utils/UseNotifaction";

function AddProductHook() {
    const { data: categories, isError: isCategoryError, isLoading: isCategoryLoading } = useGetCategoriesQuery();
    const { data: brands, isError: isBrandError, isLoading: isBrandLoading } = useGetBrandsQuery();
    const [postProduct] = usePostProductMutation();

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

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
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState<string[]>([]);

    const { data: category_sub } = useGetCategory_SubQuery(category, { skip: !category });
    useEffect(() => {
        if (category_sub) setOptions(category_sub.data);
    }, [category_sub]);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map((file) => 
                URL.createObjectURL(file)
            );
            setImages((prev) => prev.concat(fileArray));
        }
    };

    const removeImage = (url: string) => () => {
        setImages((prev) => prev.filter((image) => image !== url));
        URL.revokeObjectURL(url);
    };

    const handleSelect = (selectedItem: ISubCategory | ISubCategory[]) => {
        setSelectedOptions((prev) => {
            const newItems = Array.isArray(selectedItem) ? selectedItem : [selectedItem];
            return [...prev, ...newItems.filter(item => !prev.some(opt => opt._id === item._id))];
        });
    };

    const handleRemove = (removedItem: ISubCategory) => {
        setSelectedOptions((prev) => prev.filter((opt) => opt._id !== removedItem._id));
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);
    const onChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => setDiscount(e.target.value);
    const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value);
    const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);
    const onChangeBrand = (e: ChangeEvent<HTMLSelectElement>) => setBrand(e.target.value);

    const onChangeColor = () => setShowColor(!showColor);
    const handelChangeComplete = (color: { hex: string }) => {
        setColors((prev) => [...prev, color.hex]);
        setShowColor(false);
    };

    const removeColor = (color: string) => () => {
        setColors((prev) => prev.filter((c) => c !== color));
    };

    const convertBase64ToFile = async (base64: string, filename: string): Promise<File> => {
        const response = await fetch(base64);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    };

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

        const itemImages = await Promise.all(
            images.map((img, i) => convertBase64ToFile(img, `${Math.random()}-${i}.png`))
        );
        itemImages.forEach((img) => formData.append("images", img));
        colors.forEach((color) => formData.append("availableColors", color));
        selectedOptions.forEach((item) => formData.append("subcategory", item._id));

        try {
            await postProduct(formData).unwrap();
            setIsOpenConfirmModal(false);
            resetForm();
            Notify({ msg: 'The addition was completed successfully', type: 'success' });
        } catch {
            Notify({ msg: 'There is a problem with the addition process', type: 'error' });
        }
    };

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

    return [
        categories, isCategoryError, isCategoryLoading, brands, isBrandError, isBrandLoading,
        isOpenConfirmModal, handleCloseModal, handleShowModal, images, title, description,
        price, discount, quantity, category, brand, options, showColor, colors, handleImageUpload,
        removeImage, handleSelect, handleRemove, onChangeName, onChangeDescription, onChangePrice,
        onChangeDiscount, onChangeQuantity, onChangeCategory, onChangeBrand, onChangeColor,
        handelChangeComplete, removeColor, handleSubmit
    ] as const;
}

export default AddProductHook;
