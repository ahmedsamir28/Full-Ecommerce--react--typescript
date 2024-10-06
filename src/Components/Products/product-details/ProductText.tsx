import Button from "../../../UI-items/Button";
import { IProductDetails } from "../../../Interface";
import HandleWishlistHook from "../../../Hooks/User/Wishlist/Handle_Wishlist_Hook";
import AddProductToCartHook from "../../../Hooks/User/Cart/Add_ProductToCart_Hook";

interface ProductDetails {
    product: IProductDetails | undefined;
    isLoading: boolean;
}

function ProductText({ product, isLoading }: ProductDetails) {
    const [isWishlist, handleProductToWishlist] = HandleWishlistHook(product?.data?._id);
    const  [handlerChooseColor, handlerAddProductToCart,isPostCart,state]  = AddProductToCartHook(product)

    return (
        <>
            {isLoading ? (
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto animate-pulse">
                    {/* Loading skeleton */}
                    <div className="h-8 bg-gray-300 rounded mb-2"></div>
                    {/* Other skeleton loaders */}
                </div>
            ) : product ? (
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto ">
                    <h1 className="text-2xl font-bold mb-2">{product.data.title}</h1>
                    <p className="text-sm text-gray-600 mb-4">{product.data.description || "No description available."}</p>

                    {/* Review section */}
                    <div className="flex items-center mb-4">
                        <div className="flex items-center space-x-1 text-green-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15l-5-5 1.414-1.414L11 14.172l6.586-6.586L19 9l-8 8z" />
                            </svg>
                            <span>121 Reviews</span>
                        </div>
                    </div>

                    {/* Price section */}
                    <div className="text-2xl font-bold mb-1 flex items-center gap-2 border-y-2 py-5">
                        <span>${product.data.price}</span>
                        <span className="text-blue-700">Instead</span>
                        <span className="text-md text-zinc-500 line-through">${product.data.priceAfterDiscount}</span>
                    </div>

                    {/* Color selection */}
                    {
                        product.data.availableColors.length > 0 && <div className="mb-4 pt-3 pb-5 border-b-2">
                            <p className="font-semibold mb-2">Choose a Color</p>
                            <div className="flex space-x-2">
                                {product.data.availableColors.map((color) => (
                                    <div
                                        key={color}
                                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${color === state.color ? 'border-blue-700' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                        onClick={(e) => handlerChooseColor(e, color)}
                                    />
                                ))}
                            </div>
                        </div>
                    }

                    {/* Action buttons */}
                    <div className="flex space-x-4 mb-4 mt-4">
                        <Button disabled={isPostCart} onClick={handlerAddProductToCart} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg">
                            {isPostCart ? 'Loading' : 'Add to Cart'}
                        </Button>
                        <Button onClick={(e) => handleProductToWishlist(e, product?.data?._id)}
                            className="border hover:bg-slate-100 border-gray-300 text-gray-700 px-6 py-2 rounded-lg">
                            <i className={`fa-regular fa-heart text-xl text-blue-700 ${isWishlist ? 'font-bold' : ''}`}></i>
                        </Button>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default ProductText;
