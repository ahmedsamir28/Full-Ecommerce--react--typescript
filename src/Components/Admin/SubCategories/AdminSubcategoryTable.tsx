import GetSubCategoryTableHook from "../../../Hooks/Admin/SubCategory/Get_SubCategory_Table_Hook";
import { ISubCategory } from "../../../Interface";
import Button from "../../../UI-items/Button"

function AdminSubcategoryTable() {
    const [data, isError, isLoading, formatDate] = GetSubCategoryTableHook();

    return (
        <>
            {!isLoading && isError && <p className="text-center text-error">There is no data</p>}
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
                        {isLoading ? (
                            Array.from({ length:5 }, (_, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <div className="h-4 w-10 bg-gray-300 animate-pulse mx-auto"></div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <div className="h-full w-full bg-gray-300 animate-pulse rounded-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="h-4 w-32 bg-gray-300 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-4 w-24 bg-gray-300 animate-pulse"></div>
                                    </td>
                                    <td>
                                        <div className="h-4 w-24 bg-gray-300 animate-pulse"></div>
                                    </td>
                                    <td className="flex items-center justify-end gap-5">
                                        <div className="h-8 w-20 bg-gray-300 animate-pulse"></div>
                                        <div className="h-8 w-20 bg-gray-300 animate-pulse"></div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            data &&
                            data.data.map((subCategory: ISubCategory, index) => (
                                <tr key={subCategory._id}>
                                    <td className="text-center">
                                        {index + 1}
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{subCategory.name}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        {subCategory.category}
                                    </td>

                                    <td>
                                        {formatDate(subCategory.createdAt)}
                                    </td>

                                    <td className="flex items-center justify-end gap-5">
                                        <Button className="btn btn-outline btn-error capitalize"> <i className="fa-regular fa-trash-can"></i> delete </Button>
                                        <Button className="btn btn-outline btn-warning capitalize"> <i className="fa-regular fa-pen-to-square"></i> update </Button>

                                    </td>
                                </tr>
                            ))
                        )}


                    </tbody>
                </table>
            </div>
        </>

    )
}

export default AdminSubcategoryTable
