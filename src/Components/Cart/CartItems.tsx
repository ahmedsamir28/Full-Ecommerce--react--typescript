import SubTitle from "../../Utils/SubTitle"
import CartCheckout from "./CartCheckout"
import CartItemCard from "./CartItemCard"

function CartItems() {
    return (
        <div>
            <div className="text-xl font-bold">
                Cart <span className="text-sm text-zinc-500">(4 items)</span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-5">
                <div className="flex flex-col gap-5 border-2 w-full">
                    <CartItemCard />
                    <CartItemCard />
                    <CartItemCard />
                    <CartItemCard />
                </div>
                <div>
                    <CartCheckout />
                </div>
            </div>
        </div>
    )
}

export default CartItems
