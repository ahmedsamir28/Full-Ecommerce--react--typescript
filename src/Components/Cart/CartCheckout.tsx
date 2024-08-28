import SubTitle from "../../Utils/SubTitle"

function CartCheckout() {
    return (
        <div className='p-5 rounded-md bg-zinc-100 w-96'>
            <div className="text-xl font-semibold text-zinc-600 mb-3"> Order Summary </div>
            <div className='flex items-center justify-start'>
                <input
                    type='text'
                    className='w-11/12 h-10 text-center border border-zinc-300 rounded-l-md outline-none bg-white'
                    placeholder='Discount code' />
                <button className='h-10 px-2 border border-blue-700  cursor-pointer text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-r-md capitalize'>apply</button>
            </div>
            <div className='p-3 mt-4 text-sm text-center border-2 rounded-lg'>
                <div>
                    <span style={{ textDecorationLine: 'line-through' }}>$ 2454 </span>
                    <span className='pl-4'> $ 5478</span>
                </div>
            </div>
            <button className='w-full p-3 px-2 mt-4 text-center border border-black rounded-lg bg-amber-300 hover:bg-amber-400 '>proceed to buy</button>
            <button className='w-full p-3 px-2 mt-4 text-center border border-black rounded-lg bg-amber-300 hover:bg-amber-400 '>remove all cart</button>
        </div>
    )
}

export default CartCheckout
