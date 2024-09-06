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
    const [postProduct] = usePostProductMutation
        ();

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

    // Fetch subcategories when the category changes
    const { data: category_sub } = useGetCategory_SubQuery(category, { skip: !category, }); // Skip the query if no category is selected

    useEffect(() => {
        if (category_sub) {
            setOptions(category_sub.data);
        }
    }, [category_sub]);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prevImages) => prevImages.concat(fileArray));
        }
    };

    const removeImage = (url: string) => {
        return () => {
            setImages((prevImages) => prevImages.filter((image) => image !== url));
            URL.revokeObjectURL(url);
        };
    };

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

    const handleRemove = (removedItem: ISubCategory) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option._id !== removedItem._id)
        );
    };

    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };
    const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };
    const onChangeDiscount = (event: ChangeEvent<HTMLInputElement>) => {
        setDiscount(event.target.value);
    };
    const onChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value);
    };

    const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };
    const onChangeBrand = (event: ChangeEvent<HTMLSelectElement>) => {
        setBrand(event.target.value);
    };

    const onChangeColor = () => {
        setShowColor(!showColor);
    };

    const handelChangeComplete = (color: { hex: string }) => {
        setColors([...colors, color.hex]);
        setShowColor(false);
    };

    const removeColor = (color: string) => {
        return () => {
            const newColor = colors.filter((e) => e !== color);
            setColors(newColor);
        };
    };

    const convertBase64ToFile = async (base64: string, filename: string): Promise<File> => {
        const response = await fetch(base64);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() === "" || description === '' || price === '' || category === '' || brand === '') {
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
            images.map((img, index) =>
                convertBase64ToFile(img, `${Math.random()}-${index}.png`)
            )
        );
        itemImages.map((item) => formData.append("images", item));
        colors.map((color) => formData.append("availableColors", color));
        selectedOptions.map((item) => formData.append("subcategory", item._id));

        try {
            await postProduct(formData).unwrap();
            setIsOpenConfirmModal(false);
            resetForm()
            Notify({ msg: 'The addition was completed successfully', type: 'success' });
        } catch {
            Notify({ msg: 'There is a problem with the addition process', type: 'error' });
        }
    };


    const resetForm = () => {
        setImages([])
        setTitle('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setQuantity('');
        setCategory('');
        setBrand('');
        setTitle('');
        setSelectedOptions([]);
        setColors([]);
    };

    return [categories, isCategoryError, isCategoryLoading, brands, isBrandError, isBrandLoading,
        isOpenConfirmModal, handleCloseModal, handleShowModal, images,
        title, description, price, discount, quantity, category, brand, options, showColor, colors,
        handleImageUpload, removeImage, handleSelect, handleRemove, onChangeName, onChangeDescription
        , onChangePrice, onChangeDiscount, onChangeQuantity, onChangeCategory, onChangeBrand, onChangeColor,
        handelChangeComplete, removeColor, handleSubmit
    ] as const
}

export default AddProductHook
