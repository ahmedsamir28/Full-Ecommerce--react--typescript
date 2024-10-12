import { MouseEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { usePostCartMutation } from "../../../Redux/RTK Query/cart_slice";
import { IProduct } from "../../../Interface";

function AddProductToCartHook(product : IProduct  |undefined) {
    const [postCart, { isLoading: isPostCart }] = usePostCartMutation();

    const [state, setState] = useState({
        productId: product?._id || '',
        color: '',
    });

    useEffect(() => {
        if (product?._id) {
            setState((prevState) => ({ ...prevState, productId: product._id, }));
        }
    }, [product?._id]);

    const handlerChooseColor = (e: MouseEvent<HTMLDivElement>, color: string) => {
        e.preventDefault();
        setState((prevState) => ({ ...prevState, color: color }));
    };

    const handlerAddProductToCart = async (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault();

        const user = localStorage.getItem('user');
        if (!user) {
            Notify({ msg: 'Please log in to add items to the cart.', type: 'warn' });
            return;
        }

        if (!state.productId) {
            Notify({ msg: 'Invalid product. Please try again.', type: 'error' });
            return;
        }

        const hasMultipleColors = Array.isArray(product?.availableColors) && product?.availableColors.length > 1;
        if (hasMultipleColors && !state.color) {
            Notify({ msg: 'Please choose a color', type: 'warn' });
            return;
        }

        try {
            const cartPayload = { productId: state.productId, color: state.color };
            const result = await postCart(cartPayload);

            if (result.error) {
                Notify({ msg: 'There was an error adding the product to the cart', type: 'error' });
            } else {
                Notify({ msg: 'The product has been successfully added to the shopping cart.', type: 'success' });
            }
        } catch {
            Notify({ msg: 'An unexpected error occurred', type: 'error' });
        }
    };

    return [handlerChooseColor, handlerAddProductToCart ,isPostCart ,state] as const
}

export default AddProductToCartHook
