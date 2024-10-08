import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useApplyCouponMutation } from "../../Redux/RTK Query/cart_slice";
import Button from "../../UI-items/Button";

interface ICheckout {
    totalCartPrice?: number;
    totalAfterDiscount?: number;
    numOfCartItems?: number;
}

function CartCheckout({ totalCartPrice = 0, totalAfterDiscount, numOfCartItems = 0 }: ICheckout) {
    const [coupon, setCoupon] = useState<string>("");
    const [applyCoupon, { isLoading, error }] = useApplyCouponMutation();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCoupon(e.target.value);
    };

    const applyCouponHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!coupon) {
            console.log("Please enter a coupon code.");
            return;
        }

        try {
            await applyCoupon({ couponName: coupon }).unwrap();
            console.log("Coupon applied successfully!");
        } catch (error) {
            console.error("Failed to apply coupon:", error);
        }
    };

    useEffect(() => {
    console.log(error);
    
    }, [error])
    return (
        <div className="p-5 rounded-md bg-gray-50 w-96 border-2 shadow-sm">
            <div className="text-xl font-semibold text-zinc-600 mb-3">
                Order Summary
            </div>

            <div className="flex flex-col gap-2">
                {/* Coupon Input */}
                <div className="flex items-center justify-start mb-5">
                    <input
                        value={coupon}
                        onChange={handleInput}
                        type="text"
                        className="w-11/12 h-10 text-center border border-zinc-300 rounded-l-md outline-none bg-white"
                        placeholder="Coupon Code"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={applyCouponHandler}
                        className="h-10 px-2 border border-blue-700 text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-r-md capitalize"
                        disabled={isLoading}
                    >
                        {isLoading ? "Applying..." : "Apply"}
                    </Button>
                </div>

                {/* Subtotal */}
                <div className="flex items-start justify-between">
                    <span className="text-zinc-500 capitalize">
                        Subtotal ({numOfCartItems} items)
                    </span>
                    <div>
                        <span className="font-semibold">$ {totalCartPrice}</span>
                        {totalAfterDiscount && (
                            <span className="text-sm text-zinc-500 line-through ml-2">
                                $ {totalAfterDiscount}
                            </span>
                        )}
                    </div>
                </div>

                {/* Shipping Fee */}
                <div className="flex justify-between">
                    <span className="text-zinc-500">Shipping Fee</span>
                    <span className="text-sm text-green-600 capitalize">
                        Free
                    </span>
                </div>

                {/* Total Price */}
                <div className="flex justify-between border-t-2 mt-5 pt-5">
                    <span className="text-zinc-600 font-bold">Total Price</span>
                    <span className="text-lg font-bold">
                        $ {totalAfterDiscount ?? totalCartPrice}
                    </span>
                </div>
            </div>

            {/* Checkout Button */}
            <Button
                className="w-full p-3 mt-4 text-center text-white text-lg border border-blue-700 rounded-lg bg-blue-600 hover:bg-blue-700 capitalize"
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Check-out"}
            </Button>
        </div>
    );
}

export default CartCheckout;
