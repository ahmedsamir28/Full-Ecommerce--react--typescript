import { Link } from "react-router-dom"
import Image from "../../UI-items/Image"

const ProductCard = () => {
    return (
        <div className='border-2 p-2 rounded-badge'>
            <div className="relative">
                <div className=" border bg-zinc-100  rounded-badge py-1 px-6">
                    <Link to="product-details/4">
                        <Image
                            alt="image name"
                            url="/src/assets/assets/Headphone2.png"
                            className="w-full"
                        />
                    </Link>
                </div>
                <span className="absolute top-3 left-4 cursor-pointer">
                    <i className="fa-regular fa-heart text-xl text-blue-700"></i>
                </span>

                <div className="absolute bottom-3 left-3">
                    <div className="flex items-start bg-white px-4 py-1 rounded-full ">
                        <span className="mr-1">5.0</span>
                        <i className="fa-solid fa-star text-blue-700 text-sm"></i>
                        <span className="text-zinc-500 text-sm ml-2"> ( 14.5 )</span>
                    </div>
                </div>
            </div>
            <div className="mt-2 ml-2">
                <h6>title of the product</h6>
                <div className="mt-1 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <span className="text-lg">$ 5000 </span>
                        <span className="text-sm text-zinc-500" style={{ textDecorationLine: 'line-through' }}>$ 3000</span>
                    </div>

                    <div className="bg-white hover:bg-slate-100 py-1 px-2 border-2 rounded-badge cursor-pointer">
                        <i className="fa-solid fa-cart-plus text-xl text-blue-700"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
