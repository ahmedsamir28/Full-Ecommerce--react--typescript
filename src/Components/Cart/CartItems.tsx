import { useGetCartQuery } from "../../Redux/RTK Query/cart_slice";
import Button from "../../UI-items/Button";
import CartCheckout from "./CartCheckout";
import CartItemCard from "./CartItemCard";
import { CartItem } from "../../Interface";

function CartItems() {
    const { data, isLoading } = useGetCartQuery(); 
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold">
                    Cart <span className="text-sm text-zinc-500">({data?.numOfCartItems ?? 0} items)</span>
                </div>
                <Button className="capitalize border-2 py-2 px-3 hover:bg-zinc-200 text-zinc-500 text-sm">
                    <i className="fa-regular fa-trash-can"></i> remove all cart
                </Button>
            </div>

            <div className="mt-5 flex items-start justify-between gap-5">
                <div className="flex flex-col gap-5 w-full">
                    {data?.data.products.map((item: CartItem) => (
                        <CartItemCard key={item.product._id} cart={item} isLoading={isLoading} />
                    ))}
                </div>
                <div>
                    <CartCheckout />
                </div>
            </div>
        </div>
    );
}

export default CartItems;
