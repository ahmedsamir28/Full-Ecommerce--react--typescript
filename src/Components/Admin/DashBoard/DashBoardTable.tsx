import Image from "../../../UI-items/Image"

function DashBoardTable() {
    return (
        <div className="overflow-x-auto border-2 rounded-lg">
            <table className="table ">
                {/* head */}
                <thead>
                    <tr>

                        <th className="capitalize font-extrabold text-black text-sm">User Name</th>
                        <th className="capitalize font-extrabold text-black text-sm">order No</th>
                        <th className="capitalize font-extrabold text-black text-sm">Product Coast</th>
                        <th className="capitalize font-extrabold text-black text-sm">Product name</th>
                        <th className="capitalize font-extrabold text-black text-sm">Payment Mode</th>
                        <th className="capitalize font-extrabold text-black text-sm">Start Date</th>
                        <th className="capitalize font-extrabold text-black text-sm">Payment Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>

                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <Image
                                            url="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component"
                                            className=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Hart Hagerty</div>
                                    <div className="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                        </td>

                        <td>
                            4567
                        </td>

                        <td>$ 123</td>

                        <td>title of product</td>

                        <td className="capitalize ">
                            credit card
                        </td>

                        <td>45/7/2021</td>

                        <td>
                            <button className="btn btn-outline btn-success"> approved </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default DashBoardTable