import { useState } from "react";
import { Address } from "../../Interface";
import { useGetCartQuery } from "../../Redux/RTK Query/cart_slice";
import { useGetAddressesQuery } from "../../Redux/RTK Query/addresses_slice";
import { useGetCheckOutSessionQuery, usePostOrderMutation } from "../../Redux/RTK Query/orders_slice";
import Notify from "../../Utils/UseNotifaction";

function Create_Order_Hook() {
    const [paymentMethodType, setPaymentMethodType] = useState<string>('');
    const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const { data: cartData, isLoading: isCartLoading } = useGetCartQuery();
    const { data: addresses, isLoading: isAddressesLoading } = useGetAddressesQuery();

    const { _id: cartId, totalCartPrice, totalAfterDiscount } = cartData?.data || {};

    const [postOrder, { isLoading: orderLoading }] = usePostOrderMutation();
    const { data: checkoutData, isLoading: isCheckoutLoading } = useGetCheckOutSessionQuery(
        {
            id: cartId,
            shippingAddress,
        },
        { skip: !cartId || !shippingAddress } 
    );

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethodType(e.target.value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAddress = addresses?.data.find((address) => address.details === e.target.value) || null;
        setShippingAddress(selectedAddress);
    };

    const handleCreateOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            if (!paymentMethodType || !shippingAddress) {
                Notify({
                    msg: 'Please select both a payment method and shipping address.',
                    type: 'warn'
                });
                return;
            }

            if (paymentMethodType === 'cash') {
                await postOrder({
                    id: cartId,
                    shippingAddress,
                });
                Notify({ msg: 'Order placed successfully!', type: 'success' });
                setTimeout(() => {
                    window.location.href = '/user/allorders';
                }, 1000);
            } else if (paymentMethodType === 'card') {
                if (checkoutData?.status === 'success') {
                    Notify({ msg: 'The order has been placed successfully. You will be directed to the card payment page!', type: 'success' });
                    setTimeout(() => {
                        window.location.href = checkoutData?.session.url;
                    }, 1000);
                } else {
                    Notify({ msg: 'Failed to create checkout session. Please try again.', type: 'error' });
                }
            }
        } catch {
            Notify({ msg: 'Failed to initialize payment. Please try again.', type: 'error' });
        } finally {
            setIsProcessing(false);
        }
    };
    const isButtonDisabled = orderLoading || isProcessing || isCheckoutLoading || !paymentMethodType || !shippingAddress;

    return [paymentMethodType,shippingAddress,addresses,isProcessing,isCartLoading,isAddressesLoading,totalCartPrice,totalAfterDiscount,orderLoading,handlePaymentMethodChange,handleAddressChange,handleCreateOrder,isButtonDisabled ] as const
}

export default Create_Order_Hook
