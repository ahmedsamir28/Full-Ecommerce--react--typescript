import Button from "../../../UI-items/Button"
import Image from "../../../UI-items/Image"

function AdminBrandTable() {
    return (
        <div className="overflow-x-auto border-2 rounded-lg xl:w-[900px] 2xl:w-[1000px]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="">
                        <th className="capitalize font-extrabold text-black text-sm"></th>
                        <th className="capitalize font-extrabold text-black text-sm">brand title</th>
                        <th className="capitalize font-extrabold text-black text-sm">created at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td>
                            1
                        </td>

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
                                </div>
                            </div>
                        </td>

                        <td>
                            42/4/2024
                        </td>

                        <td className="flex items-center justify-end gap-5">
                            <Button className="btn btn-outline btn-error capitalize"> <i className="fa-regular fa-trash-can"></i> delete </Button>
                            <Button className="btn btn-outline btn-warning capitalize"> <i className="fa-regular fa-pen-to-square"></i> update </Button>

                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default AdminBrandTable
