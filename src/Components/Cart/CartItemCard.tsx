import { Link } from "react-router-dom";
import Button from "../../UI-items/Button";
import Image from "../../UI-items/Image";
import { CartItem } from "../../Interface";
import Handle_Quantity_Change_Hook from "../../Hooks/User/Cart/Handle_Quantity_Change_Hook";

interface ICart {
    cart: CartItem | undefined;
    isLoading: boolean;
}

function CartItemCard({ cart, isLoading }: ICart) {
    const [quantity, handleQuantityChange, handleRemoveFromCart] = Handle_Quantity_Change_Hook(cart)


    // If no cart data is available, show a message
    if (!cart) {
        return <div>No cart data available</div>;
    }

    // Destructure cart item data for easier readability
    const { product, price, color, _id, count } = cart;
    const { imageCover, title, category } = product || {};

    return (
        <>
            {
                isLoading ? (<div className="border-2 rounded-lg w-full flex items-start gap-5 py-3 px-5 animate-pulse">
                    <div className="w-32 h-46 bg-gray-300 rounded-xl"></div>
                    <div className="flex flex-col gap-5 w-full">
                        <div className="h-6 bg-gray-300 w-1/2 rounded"></div>
                        <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
                        <div className="flex items-center gap-5">
                            <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
                            <div className="h-8 w-10 bg-gray-300 rounded-lg"></div>
                        </div>
                    </div>
                </div>) : (<div className="border-2 rounded-lg w-full flex items-start gap-5 py-3 px-5">
                    <Link to="" className="border py-2 px-3 rounded-xl bg-gray-200">
                        <Image url={imageCover} alt="Product image" className="w-32 h-46" />
                    </Link>
                    <div className="w-full flex flex-col gap-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <h6 className="text-lg capitalize">{title || "No title"}</h6>
                                <p className="mt-2 text-sm text-zinc-600">{category?.name || "No category"}</p>
                            </div>
                            <div>
                                <span className="text-lg font-bold text-zinc-500">$ {price || "N/A"}</span>
                            </div>
                        </div>

                        {/* Color block */}
                        <div
                            className="w-8 h-8 rounded-full border-2 cursor-pointer"
                            style={{ backgroundColor: color || "#ccc" }}
                        ></div>

                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-5">
                                <Button
                                    onClick={(e) => handleRemoveFromCart(e, _id)}
                                    className="py-1 px-2 border-2 text-zinc-500 text-sm hover:bg-zinc-200"
                                >
                                    <i className="fa-regular fa-trash-can"></i> Remove
                                </Button>
                                <div>
                                    <span className="mr-2 text-zinc-500">Qty</span>
                                    <select
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(e, _id)}
                                        className="py-1 px-3 cursor-pointer bg-white rounded-lg border-2 text-sm text-gray-700 outline-none"
                                    >
                                        {[...Array(5)].map((_, idx) => (
                                            <option key={idx + 1} value={idx + 1}>
                                                {idx + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className="border px-2 text-blue-700 border-blue-700 rounded-2xl">
                                    {count || 1}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>

    );
}

export default CartItemCard;
