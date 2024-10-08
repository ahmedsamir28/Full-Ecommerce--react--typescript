import { useEffect } from "react";
import CartItems from "../../Components/Cart/CartItems"
import { ToastContainer } from "react-toastify";

function CartPage() {
    useEffect(() => {
        document.title = "Cart Page";
    }, []);
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5 container ">
            <CartItems />
            <ToastContainer/>
        </div>
    )
}

export default CartPage
