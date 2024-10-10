import { useEffect } from "react";
import PayMethod from "../../Components/CheckOut/payMethod"
import { ToastContainer } from "react-toastify";

const CheckoutPage = () => {
    useEffect(() => {
        document.title = "CheckOut Page";
    }, []);
    return (
        <div className='container mt-3 border-t-2 ' style={{ minHeight: '800px' }}>
            <div>
                
            </div>
                <div className="mt-5">
                    <PayMethod />
                </div>
                <ToastContainer />
        </div>
    )
}

export default CheckoutPage
