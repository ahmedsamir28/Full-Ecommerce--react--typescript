import { Link } from "react-router-dom"
import Button from "../../UI-items/Button"
import Image from "../../UI-items/Image"

function CartItemCard() {
    return (
        <div className="border-2 rounded-lg w-full flex items-start gap-5 py-3 px-5">
            <Link to="" className="border py-2 px-3 rounded-xl bg-gray-200">
                <Image url="/src/assets/assets/Headphone5.png" alt="test phon" className="w-32 h-46" />
            </Link>
            <div className=" w-full flex flex-col gap-5 ">
                <div className="flex items-start justify-between">
                    <div>
                        <h6 className="text-lg capitalize">title of the product</h6>
                        <p className="mt-2 text-sm text-zinc-600">sjakfhahf kjsfh dsf jfndsfn djfnn dfn </p>
                    </div>
                    <div>
                        <span className="text-lg font-bold">$ 5000 </span>
                        <span className="block">
                            <span className="text-sm text-zinc-500 " style={{ textDecorationLine: 'line-through' }}>$ 3000 </span>
                            <span className="text-success text-sm">20% off</span>
                        </span>
                    </div>
                </div>
                <div className={`w-8 h-8 rounded-full border-2 cursor-pointer`} style={{ backgroundColor: "blue" }} ></div>
                <div className="flex items-start justify-between">
                    <Button className="py-1 px-2 border-2 text-zinc-500 text-sm hover:bg-zinc-200"> <i className="fa-regular fa-trash-can"></i> Remove</Button>
                    <div>
                        <span className="mr-2 text-zinc-500">Qty</span>
                        <select className="py-1 px-3 cursor-pointer bg-white rounded-lg border-2 text-sm text-gray-700  outline-none">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CartItemCard
