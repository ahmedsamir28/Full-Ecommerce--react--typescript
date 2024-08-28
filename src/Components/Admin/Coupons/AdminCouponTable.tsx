import Button from "../../../UI-items/Button"

function AdminCouponsTable() {
    return (
        <div className="overflow-x-auto border-2 rounded-lg xl:w-[900px] 2xl:w-[1000px]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="">
                        <th className="capitalize font-extrabold text-black text-sm"></th>
                        <th className="capitalize font-extrabold text-black text-sm">coupon name</th>
                        <th className="capitalize font-extrabold text-black text-sm">Expiry date</th>
                        <th className="capitalize font-extrabold text-black text-sm">discount percentage </th>
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
                                <div>
                                    <div className="font-bold">coupon name</div>
                                </div>
                            </div>
                        </td>

                        <td>
                            25/4/2024
                        </td>

                        <td>
                            discount percentage
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

export default AdminCouponsTable
