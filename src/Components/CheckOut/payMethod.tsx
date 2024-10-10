import Button from "../../UI-items/Button";
import { Address } from "../../Interface";
import Create_Order_Hook from "../../Hooks/Orders/Create_Order_Hook";

const PayMethod = () => {
const [paymentMethodType,shippingAddress,addresses,isProcessing,isCartLoading,isAddressesLoading,totalCartPrice,totalAfterDiscount,orderLoading,handlePaymentMethodChange,handleAddressChange,handleCreateOrder,isButtonDisabled ] =Create_Order_Hook()
    if (isCartLoading || isAddressesLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
            </div>
        );
    }


    return (
        <div className="p-5 border-2 mt-2 mx-auto bg-white rounded-lg shadow-md max-w-3xl">
            {/* Payment Options */}
            <div className="mb-6">
                <div className="text-lg font-semibold mb-3">Payment Options</div>
                <div className="flex flex-col gap-3">
                    {[
                        { id: 'card', label: 'Payment via credit card' },
                        { id: 'cash', label: 'Payment when receiving' }
                    ].map(({ id, label }) => (
                        <div key={id} className="flex items-center">
                            <input
                                name="paymentMethod"
                                id={id}
                                type="radio"
                                value={id}
                                checked={paymentMethodType === id}
                                onChange={handlePaymentMethodChange}
                                className="cursor-pointer w-4 h-4"
                            />
                            <label
                                className="mx-3 cursor-pointer text-gray-700"
                                htmlFor={id}
                            >
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
                <label
                    htmlFor="shipping-address"
                    className="block mb-2 font-medium text-gray-700"
                >
                    Select shipping address
                </label>
                <select
                    id="shipping-address"
                    onChange={handleAddressChange}
                    value={shippingAddress?.details || ''}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Select shipping address</option>
                    {addresses?.data.map((address: Address) => (
                        <option key={address._id} value={address.details}>
                            {address.details}
                        </option>
                    ))}
                </select>
            </div>

            {
                totalAfterDiscount ? (
                    <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                            <div className="text-sm text-gray-500">Original Price:</div>
                            <div className="text-gray-500 line-through">
                                ${totalCartPrice?.toFixed(0) || '0.00'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Final Price:</div>
                            <div className="text-xl font-semibold text-blue-700">
                                ${totalAfterDiscount?.toFixed(0) || '0.00'}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                            <div className="text-sm text-gray-500">Original Price:</div>
                            <div className="text-xl font-semibold text-blue-700">
                                ${totalCartPrice?.toFixed(0) || '0.00'}
                            </div>
                        </div>
                    </div>)
            }

            {/* Purchase Button */}
            <div className="text-right">
                <Button
                    onClick={handleCreateOrder}
                    disabled={isButtonDisabled}
                    className={`
                        px-6 py-3 text-white font-bold rounded-md 
                        ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} 
                        transition-colors duration-300
                    `}
                    title={isButtonDisabled ? 'Ensure payment method and shipping address are selected' : ''}
                >
                    {isProcessing || orderLoading ? (
                        <span className="flex items-center">
                            <span className="mr-2">Processing...</span>
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                        </span>
                    ) : (
                        'Complete Purchase'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default PayMethod;
