import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { CompactPicker } from 'react-color';
import Button from "../../../UI-items/Button";
import Modal from "../../../UI-items/Modal";
import Image from "../../../UI-items/Image";
import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";
import { useGetBrandsQuery } from "../../../Redux/RTK Query/brands_slice";
import { useGetCategory_SubQuery } from "../../../Redux/RTK Query/subCategory_slice";
import { IData, ISubCategory } from "../../../Interface";


function AdminAddProduct() {
    const { data: categories, isError: isCategoryError, isLoading: isCategoryLoading } = useGetCategoriesQuery();
    const { data: brands, isError: isBrandError, isLoading: isBrandLoading } = useGetBrandsQuery();

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<ISubCategory[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<string | number>("");
    const [discount, setDiscount] = useState<string | number>("");
    const [quantity, setQuantity] = useState<string | number>("");
    const [category, setCategory] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [options, setOptions] = useState<ISubCategory[]>([]);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState<string[]>([]);

    // Fetch subcategories based on selected category
    const { data: category_sub } = useGetCategory_SubQuery(category || "");

    useEffect(() => {
        if (category_sub) {
            setOptions(category_sub.data);
        }
    }, [category_sub]);

    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        }
    };

    const handleSelect = (selectedItem: ISubCategory) => {
        setSelectedOptions([...selectedOptions, selectedItem]);
    }

    const handleRemove = (removedItem: ISubCategory) => {
        setSelectedOptions(
            selectedOptions.filter((option) => option._id !== removedItem._id)
        );
    };

    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
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
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ name, description, price, discount, quantity, images, category, brand, colors, selectedOptions });
        // Implement your submit logic here
    };

    return (
        <div className="flex items-center justify-center">
            <Button onClick={handleShowModal} className="w-46 btn btn-outline capitalize btn-success">
                <i className="fa-solid fa-plus text-lg"></i> Add Product
            </Button>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={handleCloseModal}
                onSubmit={handleSubmit}
                title="Add Product"
                add="Add Product"
            >
                <div className="flex gap-5 items-center justify-start border-2 rounded-lg py-2 scroll">
                    <div>
                        <label htmlFor="file">
                            <div className="py-3 px-3 border-r-2 cursor-pointer text-center">
                                <span className="text-xl"><i className="fa-regular fa-images"></i></span>
                                <div className="capitalize text-blue-700 mt-3">Click to Upload</div>
                            </div>
                        </label>
                        <input type="file" id="file" multiple onChange={handleImageUpload} className="hidden" />
                    </div>
                    <div className="flex space-x-2 items-center">
                        {images.map((photo, index) => (
                            <Image url={photo} key={index} onClick={removeImage(photo)} alt="" className="h-24 rounded-md cursor-pointer" />
                        ))}
                    </div>
                </div>

                <div className="">
                    <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                        Title:
                        <input
                            value={name}
                            onChange={onChangeName}
                            type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Type here" />
                    </label>

                    <label htmlFor="textarea" className="capitalize">
                        Description:
                    </label>
                    <textarea
                        value={description}
                        onChange={onChangeDescription}
                        id="textarea"
                        className="textarea textarea-info text-lg mt-2 w-full placeholder:text-zinc-500 text-gray-700 capitalize" placeholder="Type description"></textarea>

                    <div className="flex flex-col md:flex-row items-center gap-5 md:gap-2 mt-5 mb-5">
                        <label className="input input-bordered input-info flex items-center w-full gap-2">
                            Price:
                            <input
                                value={price}
                                onChange={onChangePrice}
                                type="number"
                                className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                                placeholder="Price before discount" />
                        </label>
                        <label className="input input-bordered input-info flex items-center w-full gap-2">
                            Discount:
                            <input
                                value={discount}
                                onChange={onChangeDiscount}
                                type="number"
                                className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                                placeholder="Price after discount" />
                        </label>
                    </div>

                    <label className="input input-bordered input-info flex items-center w-full gap-2">
                        Quantity:
                        <input
                            value={quantity}
                            onChange={onChangeQuantity}
                            type="number"
                            className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                            placeholder="Quantity" />
                    </label>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
                    <select
                        value={category}
                        onChange={onChangeCategory}
                        className="select select-info w-full text-lg capitalize text-zinc-600">
                        <option value="" disabled>Main Category</option>
                        {!isCategoryLoading && !isCategoryError && categories && categories.data.map((category: IData) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <select
                        value={brand}
                        onChange={onChangeBrand}
                        className="select select-info w-full text-lg capitalize text-zinc-600">
                        <option value="" disabled>Choose a Brand</option>
                        {!isBrandLoading && !isBrandError && brands && brands.data.map((brand: IData) => (
                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                        ))}
                    </select>
                </div>

                <Multiselect
                    className="capitalize rounded-lg mt-5 border border-info"
                    placeholder="Sub Category"
                    options={options}
                    onSelect={handleSelect}
                    onRemove={handleRemove}
                    displayValue="name"
                />

                <div className="text-lg font-semibold text-gray-600 mb-3">Available Colors</div>
                <div className="flex flex-wrap items-center gap-3">
                    {colors.length > 0 && colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={removeColor(color)}
                            className="cursor-pointer w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <div
                        onClick={onChangeColor}
                        className="w-8 h-8 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    {showColor && (
                        <div className="absolute bottom-[-5px] left-0 p-3 rounded-lg shadow-lg z-10">
                            <CompactPicker onChangeComplete={handelChangeComplete} />
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default AdminAddProduct;