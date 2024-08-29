import Button from "../../UI-items/Button"
import SubTitle from "../../Utils/SubTitle"

function CartCheckout() {
    return (
        <div className='p-5 rounded-md bg-gray-50 w-96 border-2'>
            <div className="text-xl font-semibold text-zinc-600 mb-3"> Order Summary </div>
            <div className="flex flex-col gap-2">

                <div className='flex items-center justify-start mb-5'>
                    <input
                        type='text'
                        className='w-11/12 h-10 text-center border border-zinc-300 rounded-l-md outline-none bg-white'
                        placeholder='coupon code' />
                    <button className='h-10 px-2 border border-blue-700  cursor-pointer text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-r-md capitalize'>apply</button>
                </div>

                <div className='flex items-start justify-between'>
                    <span className="text-zinc-500 capitalize">Subtotal (24 items)</span>
                    <div>
                        <span className="">$ 2454 </span>
                        <span style={{ textDecorationLine: 'line-through' }} className='text-sm text-zinc-500'> $ 4535</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <span className="text-zinc-500">
                        Shipping Fee
                    </span>
                    <span className="text-success text-sm capitalize">free </span>
                </div>

                <div className="flex justify-between border-t-2 mt-5 pt-5">
                    <span className="text-zinc-600 font-bold">
                        Total Price
                    </span>
                    <span className="text-lg font-bold">$ 2454 </span>
                </div>
                
            </div>

            <Button className='w-full p-3 px-2 mt-4 text-center text-white text-lg border border-blue-700 rounded-lg bg-blue-600 hover:bg-blue-700 capitalize'>check-out</Button>
        </div>
    )
}

export default CartCheckout
