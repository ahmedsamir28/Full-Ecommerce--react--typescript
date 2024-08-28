import { Link } from "react-router-dom"
import Image from "../../../UI-items/Image"

function UserOrderCard() {
    return (
        <div className=' mt-3'>
            <div className='flex items-center gap-7 '>
                <div className='border rounded-xl px-2 bg-zinc-100'>
                    <Link to={`/product-details/4`}>
                        <Image className='w-24 h-24' url="/src/assets/assets/camera1.png" alt="sasdg" />
                    </Link>
                </div>

                <div className='flex flex-col items-start justify-start gap-3'>
                    <h6 className='text-zinc-700'>product title</h6>
                    <div className='flex gap-2 items-center'>
                        <span className="text-md">Quantity</span>
                        <span className='border border-blue-700 px-1 rounded-md text-blue-700'>
                            23
                        </span>
                    </div>

                </div>
            </div>
            <hr className='my-4' />
        </div>
    )
}

export default UserOrderCard
