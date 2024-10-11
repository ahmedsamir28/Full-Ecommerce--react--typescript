import { Link } from "react-router-dom"
import Image from "../../../UI-items/Image"
import { CartItems } from "../../../Interface"
interface orderCard {
    cartItems: CartItems | undefined
    isLoading: boolean
}

function UserOrderCard({ cartItems, isLoading }: orderCard) {
    return (
        <div className=' mt-3'>
            {
                isLoading ? <div className='flex items-center gap-7'>
                    <div className='border rounded-xl px-2 bg-zinc-200 animate-pulse'>
                        <div className='w-24 h-24 bg-gray-300'></div>
                    </div>

                    <div className='flex flex-col items-start justify-start gap-2'>
                        <div className='w-48 h-5 bg-gray-300 rounded-md animate-pulse'></div>
                        <div className='flex gap-2 items-center'>
                            <span className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></span>
                            <span className='w-10 h-6 bg-gray-300 rounded-md animate-pulse'></span>
                        </div>
                        <div className='w-20 h-5 bg-gray-300 rounded-md animate-pulse'></div>
                    </div>
                </div> : <div className='flex items-center gap-7 '>
                    <div className='border rounded-xl px-2 bg-zinc-100'>
                        <Link to={`/product-details/4`}>
                            <Image className='w-24 h-24' url={cartItems?.product.imageCover} alt="sasdg" />
                        </Link>
                    </div>

                    <div className='flex flex-col items-start justify-start gap-2'>
                        <h6 className='text-zinc-700'>{cartItems?.product.title}</h6>
                        <div className='flex gap-2 items-center'>
                            <span className="text-md">Quantity</span>
                            <span className='border border-blue-700 px-1 rounded-md text-blue-700'>
                                {cartItems?.count}
                            </span>
                        </div>
                        <div className='text-zinc-500 font-bold'>
                            $ {cartItems?.price}
                        </div>
                    </div>
                </div>
            }

            <hr className='my-4' />
        </div>
    )
}

export default UserOrderCard
