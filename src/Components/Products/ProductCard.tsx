import { IProduct } from "../../Interface";
import { Link } from "react-router-dom";
import Image from "../../UI-items/Image";
import HandleWishlistHook from "../../Hooks/User/Wishlist/Handle_Wishlist_Hook";
interface IProductCardProps {
    product: IProduct;
    isLoading: boolean;
}

const ProductCard = ({ product, isLoading }: IProductCardProps) => {

    const [isWishlist, handleProductToWishlist] = HandleWishlistHook(product._id)

    return (
        <>
            {isLoading ? (
                <div className="border-2 p-2 rounded-badge animate-pulse">
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
                        <div className="border bg-zinc-100 h-72 rounded-badge py-1 px-6">
                            <Link to={`/product-details/${product._id}`}>
                                <Image alt="image name" url={product.imageCover} className="w-full h-full" />
                            </Link>
                        </div>
                        <span
                            onClick={(e) => handleProductToWishlist(e, product._id)}
                            className="absolute top-3 left-4 cursor-pointer"
                        >
                            <i
                                className={`fa-regular fa-heart text-xl text-blue-700 ${isWishlist ? 'font-bold' : ''}`}
                            ></i>
                        </span>

                        <div className="absolute bottom-3 left-3">
                            <div className="flex items-start bg-white px-4 py-1 rounded-full">
                                <span className="mr-1">{product.ratingsAverage || 0}</span>
                                <i className="fa-solid fa-star text-blue-700 text-sm"></i>
                                <span className="text-zinc-500 text-sm ml-2">({product.ratingsQuantity})</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 ml-2">
                        <h6>{product.title}</h6>
                        <div className="mt-1 flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <span className="text-lg">$ {product.price}</span>
                                <span className="text-sm text-zinc-500" style={{ textDecorationLine: 'line-through' }}>
                                    $3000
                                </span>
                            </div>
                            <div className="bg-white hover:bg-slate-100 py-1 px-2 border-2 rounded-badge cursor-pointer">
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
