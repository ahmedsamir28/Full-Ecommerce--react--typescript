import { IProduct } from "../../Interface";
import { Link } from "react-router-dom";
import Image from "../../UI-items/Image";
import HandleWishlistHook from "../../Hooks/User/Wishlist/Handle_Wishlist_Hook";
import AddProductToCartHook from "../../Hooks/User/Cart/Add_ProductToCart_Hook";

interface IProductCardProps {
    product: IProduct;
    isLoading: boolean;
}

const ProductCard = ({ product, isLoading }: IProductCardProps) => {
    const [isWishlist, handleProductToWishlist, wishlistError] = HandleWishlistHook(product?._id);
    const [handlerChooseColor, handlerAddProductToCart, cartError, state] = AddProductToCartHook(product);

    // Handle possible product errors (e.g., if product data is incomplete or missing)
    if (!product) {
        return <div>Error: Product data is not available.</div>;
    }

    return (
        <>
            {isLoading ? (
                <div className="border-2 p-2 rounded-badge animate-pulse">
                    {/* Loading state skeleton */}
                    <div className="relative">
                        <div className="border bg-zinc-100 rounded-badge py-1 px-6">
                            <div className="w-full h-48 bg-gray-300 rounded"></div>
                        </div>
                        <div className="absolute top-3 left-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="absolute top-3 right-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="absolute bottom-3 left-3">
                            <div className="flex items-start bg-white px-4 py-1 rounded-full">
                                <div className="w-10 h-5 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 ml-2">
                        <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="flex justify-between items-center">
                            <div className="w-16 h-4 bg-gray-300 rounded"></div>
                            <div className="w-12 h-4 bg-gray-300 rounded ml-2"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-2 p-2 rounded-badge">
                    <div className="relative">
                        {/* Ensure product image and link are available */}
                        {product?.imageCover ? (
                            <div className="border bg-zinc-100 h-72 rounded-badge py-1 px-6">
                                <Link to={`/product-details/${product?._id}`}>
                                    <Image alt={product?.title || 'Product image'} url={product?.imageCover} className="w-full h-full" />
                                </Link>
                            </div>
                        ) : (
                            <div className="border bg-zinc-100 h-72 rounded-badge py-1 px-6">
                                <div className="text-center">No Image Available</div>
                            </div>
                        )}

                        {/* Wishlist action with error handling */}
                        <span
                            onClick={(e) => handleProductToWishlist(e, product._id)}
                            className="absolute top-3 left-4 cursor-pointer"
                        >
                            <i
                                className={`fa-regular fa-heart text-xl text-blue-700 ${isWishlist ? 'font-bold' : ''}`}
                            ></i>
                        </span>
                        {wishlistError && <div className="text-red-500 mt-1">Error adding to wishlist</div>}

                        {/* Rating display */}
                        <div className="absolute bottom-3 left-3">
                            <div className="flex items-start bg-white px-4 py-1 rounded-full">
                                <span className="mr-1">{product?.ratingsAverage || 0}</span>
                                <i className="fa-solid fa-star text-blue-700 text-sm"></i>
                                <span className="text-zinc-500 text-sm ml-2">({product?.ratingsQuantity || 0})</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 ml-2">
                        <h6>{product?.title || 'Unknown Product'}</h6>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">${product?.priceAfterDiscount || 0}  </span>
                            <span className="text-sm text-zinc-500" style={{ textDecorationLine: 'line-through' }}>
                                {product?.price || 'N/A'}
                            </span>
                        </div>

                        <div className={`mt-1 flex ${product?.availableColors.length === 0 ? 'justify-end' : 'justify-between'} items-center`}>
                            {product?.availableColors.length > 0 && (
                                <div className="">
                                    <div className="flex space-x-2">
                                        {product?.availableColors.map((color) => (
                                            <div
                                                key={color}
                                                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${color === state.color ? 'border-blue-700' : 'border-gray-300'}`}
                                                style={{ backgroundColor: color }}
                                                onClick={(e) => handlerChooseColor(e, color)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div
                                onClick={handlerAddProductToCart}
                                className="bg-white hover:bg-slate-100 py-1 px-2 border-2 rounded-badge cursor-pointer"
                            >
                                <i className="fa-solid fa-cart-plus text-xl text-blue-700"></i>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
