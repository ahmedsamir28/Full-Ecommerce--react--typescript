import { Link } from "react-router-dom"
import Multiselect from 'multiselect-react-dropdown';
import { CompactPicker } from 'react-color';
import Modal from "../../../UI-items/Modal";
import Image from "../../../UI-items/Image";
import Button from "../../../UI-items/Button";
import { IData, IProduct } from "../../../Interface";
import DeleteProductHook from "../../../Hooks/Admin/Product/Delete_Product_Hook";
import UpdateProductHook from "../../../Hooks/Admin/Product/Update_Product_Hook";
interface IProductCardProps {
    product: IProduct;
    isLoading: boolean;
}

function AdminProductCard({ product, isLoading }: IProductCardProps) {
    const [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isDeleting, removeCategoryHandler] = DeleteProductHook()

    const [categories, isCategoryError, isCategoryLoading, brands, isBrandError, isBrandLoading,
        isPosting, isOpenEditModal, handleCloseEditModal, handleShowEditModal, images, title, description, price,
        discount, quantity, category, brand, options, showColor, colors, handleImageUpload, removeImage,
        handleSelect, handleRemove, onChangeName, onChangeDescription, onChangePrice, onChangeDiscount,
        onChangeQuantity, onChangeCategory, onChangeBrand, onChangeColor,
        handelChangeComplete, removeColor, editProductHandler] = UpdateProductHook()

    return (
        <>
            {/* modal of remove the product */}
            <Modal
                isOpen={isOpenDeleteModal}
                closeModal={handleCloseDeleteModal}
                onSubmit={removeCategoryHandler}
                title="Confirm deletion"
                add={isDeleting ? 'loading...' : 'remove product'}
                btnClass="error"
            >
                <p>Are you sure about the product deletion process ?</p>
            </Modal>

            {/* modal of edit the product*/}
            <Modal
                isOpen={isOpenEditModal}
                closeModal={handleCloseEditModal}
                onSubmit={editProductHandler}
                title="Add Product"
                add={isPosting ? 'Loading...' : 'edit product'}
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
                            onChange={onChangeName}
                            value={title}
                            type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Type here" />
                    </label>

                    <label htmlFor="textarea" className="capitalize">
                        Description:
                    </label>
                    <textarea
                        onChange={onChangeDescription}
                        value={description}
                        id="textarea" className="textarea textarea-info text-lg mt-2 w-full placeholder:text-zinc-500 text-gray-700 capitalize" placeholder="Type description"></textarea>

                    <div className="flex flex-col md:flex-row items-center gap-5 md:gap-2 mt-5 mb-5">
                        <label className="input input-bordered input-info flex items-center w-full gap-2">
                            Price:
                            <input
                                onChange={onChangePrice}
                                value={price}
                                type="number" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Price before discount" />
                        </label>
                        <label className="input input-bordered input-info flex items-center w-full gap-2">
                            Discount:
                            <input
                                onChange={onChangeDiscount}
                                value={discount}
                                type="number" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Price after discount" />
                        </label>
                    </div>

                    <label className="input input-bordered input-info flex items-center w-full gap-2">
                        Quantity:
                        <input
                            onChange={onChangeQuantity}
                            value={quantity}
                            type="number" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Quantity" />
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

            {
                isLoading ? (<div className="border-2 p-2 rounded-badge animate-pulse">
                    <div className="relative">
                        <div className="border bg-zinc-100 rounded-badge py-1 px-6">
                            {/* Skeleton for image */}
                            <div className="w-full h-48 bg-gray-300 rounded"></div>
                        </div>

                        {/* Skeleton for edit button */}
                        <div className="absolute top-3 left-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-xl"></div>
                        </div>

                        {/* Skeleton for delete button */}
                        <div className="absolute top-3 right-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-xl"></div>
                        </div>

                        {/* Skeleton for rating */}
                        <div className="absolute bottom-3 left-3">
                            <div className="flex items-start bg-white px-4 py-1 rounded-full">
                                <div className="w-10 h-5 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 ml-2">
                        {/* Skeleton for title */}
                        <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>

                        {/* Skeleton for price section */}
                        <div className="flex justify-between items-center">
                            <div className="w-16 h-4 bg-gray-300 rounded"></div>
                            <div className="w-12 h-4 bg-gray-300 rounded ml-2"></div>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className='border-2 p-2 rounded-badge'>
                        <div className="relative">
                            <div className=" border bg-zinc-100  rounded-badge py-1 px-6">
                                <Link to="/product-details/4">
                                    <Image
                                        alt="image name"
                                        url={product.imageCover}
                                        className="w-full"
                                    />
                                </Link>
                            </div>
                            <Button onClick={(e) => handleShowEditModal(e, product)} className="absolute top-3 left-2 cursor-pointer border-2 border-zinc-400 py-1 px-2 rounded-xl hover:bg-slate-200">
                                <i className="fa-regular fa-pen-to-square text-xl text-blue-800"></i>
                            </Button>
                            <Button onClick={(e) => handleShowDeleteModal(e, product._id)} className="absolute top-3 right-2 cursor-pointer border-2 border-zinc-400 py-1 px-2 rounded-xl hover:bg-slate-200">
                                <i className="fa-regular fa-trash-can text-xl text-blue-800"></i>
                            </Button>


                            <div className="absolute bottom-3 left-3">
                                <div className="flex items-start bg-white px-4 py-1 rounded-full ">
                                    <span className="mr-1">5.0</span>
                                    <i className="fa-solid fa-star text-blue-700 text-sm"></i>
                                    <span className="text-zinc-500 text-sm ml-2"> ( 14.5 )</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 ml-2">
                            <h6>{product.title}</h6>
                            <div className="mt-1 flex justify-between items-center">
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-lg">$ {product.price} </span>
                                    <span className="text-sm text-zinc-500" style={{ textDecorationLine: 'line-through' }}>$ {product.priceAfterDiscount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>

    )
}

export default AdminProductCard
