import Button from "../../../UI-items/Button"

function AdminSubcategoryTable() {
    return (
        <div className="overflow-x-auto border-2 rounded-lg xl:w-[900px] 2xl:w-[1000px]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="">
                        <th className="capitalize font-extrabold text-black text-sm"></th>
                        <th className="capitalize font-extrabold text-black text-sm">subCategory title</th>
                        <th className="capitalize font-extrabold text-black text-sm">category</th>
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
                                <div>
                                    <div className="font-bold">Hart Hagerty</div>
                                </div>
                            </div>
                        </td>

                        <td>
                            category title
                        </td>

                        <td>
                            25/4/2024
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

export default AdminSubcategoryTable
