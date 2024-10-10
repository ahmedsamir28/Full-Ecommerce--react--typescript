import Button from "../../UI-items/Button";
import CartCheckout from "./CartCheckout";
import CartItemCard from "./CartItemCard";
import { CartItem } from "../../Interface";
import Remove_All_Cart_Hook from "../../Hooks/User/Cart/Remove_All_Cart_Hook";

function CartItems() {
    const [data, isLoading, handleRemoveAllCart] = Remove_All_Cart_Hook()
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold">
                    Cart <span className="text-sm text-zinc-500">({data?.numOfCartItems ?? 0} items)</span>
                </div>
                {
                    (data?.numOfCartItems ?? 0) > 0 && (
                        <Button onClick={handleRemoveAllCart} className="capitalize border-2 py-2 px-3 hover:bg-zinc-200 text-zinc-500 text-sm">
                            <i className="fa-regular fa-trash-can"></i> Remove All
                        </Button>
                    )
                }
            </div>

            <div className="mt-5 flex items-start justify-between gap-5">
                <div className="flex flex-col gap-5 w-full">
                    {data?.data?.products?.map((item: CartItem) => (
                        <CartItemCard key={item.product._id} cart={item} isLoading={isLoading} />
                    ))}
                </div>
                <div>
                    <CartCheckout cart={data} totalCartPrice={data?.data.totalCartPrice} totalAfterDiscount={data?.data.totalAfterDiscount} numOfCartItems={data?.numOfCartItems} />
                </div>
            </div>
        </div>
    );
}

export default CartItems;
