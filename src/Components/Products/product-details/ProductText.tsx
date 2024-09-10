import { useState } from "react";
import Button from "../../../UI-items/Button";
import { IProductDetails } from "../../../Interface";

interface ProductDetails {
    product: IProductDetails | undefined;
}

function ProductText({ product }: ProductDetails) {

    console.log(product);
    
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState<string | null>(null);
    const maxQuantity: number = product?.data?.quantity ?? 12; // Default to 12 if quantity is undefined

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!product || !product.data) {
        return <p>Product details not available.</p>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-2">{product.data.title}</h1>
            <p className="text-sm text-gray-600 mb-4">
                {product.data.description || "No description available."}
            </p>

            <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15l-5-5 1.414-1.414L11 14.172l6.586-6.586L19 9l-8 8z" />
                    </svg>
                    <span>121 Reviews</span>
                </div>
            </div>

            <div className="text-2xl font-bold mb-1 flex items-center gap-2 border-y-2 py-5">
                <span>${product.data.price}</span>
                <span className="text-blue-700">Instead</span>
                <span className="text-md text-zinc-500" style={{ textDecorationLine: 'line-through' }}>$ {product.data.priceAfterDiscount}</span>
            </div>

            <div className="mb-4 pt-3 pb-5 border-b-2 ">
                <p className="font-semibold mb-2">Choose a Color</p>
                <div className="flex space-x-2">
                    {product.data.availableColors.map((c) => (
                        <div
                            className={`w-8 h-8 rounded-full border-2 cursor-pointer ${c === color ? 'border-blue-700' : 'border-gray-300'
                                }`}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center border rounded-lg">
                    <button className="px-3 py-1 text-xl" onClick={handleDecrease}>
                        -
                    </button>
                    <span className="px-3 py-1">{quantity}</span>
                    <button className="px-3 py-1 text-xl" onClick={handleIncrease}>
                        +
                    </button>
                </div>
                <div className="600 text-sm font-semibold">
                    Only
                    <span className="text-blue-700"> {maxQuantity - quantity} items </span>
                    left!
                </div>
            </div>

            <div className="flex space-x-4 mb-4">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg">
                    Add to Cart
                </Button>
                <Button className="border hover:bg-slate-100 border-gray-300 text-gray-700 px-6 py-2 rounded-lg">
                    <i className="fa-regular fa-heart text-xl text-blue-700"></i>
                </Button>
            </div>
        </div>
    );
}

export default ProductText;
