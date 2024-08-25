import { Link } from "react-router-dom"

function AdminSideBar() {
    return (
        <div className="flex flex-col justify-between border-e bg-white lg:w-64 ">
            <div className="px-4 py-6">
                <span className="grid  place-content-center rounded-lg bg-zinc-200 hover:bg-zinc-300 text-xl font-semibold text-gray-600 py-2 px-3">
                    <Link to="/" >E-commerce</Link>
                </span>

                <ul className="mt-6 space-y-1">
                    <li>
                        <Link
                            to="/admin/dash-board"
                            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            <i className="fa-solid fa-gauge-high text-sky-600 mr-1"></i>  DashBoard
                        </Link>
                    </li>


                    <li>
                        <Link
                            to="/admin/products"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <i className="fa-solid fa-bars-progress text-amber-700 mr-1"></i> Products Manage
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/categories"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <i className="fa-solid fa-layer-group  mr-1 text-emerald-600"></i>  Add A Category
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/subcategories"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <i className="fa-solid fa-list mr-1 text-violet-700 "></i>  Add A SubCategory
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/brands"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <i className="fa-solid fa-shuffle mr-1 text-pink-700"></i>  Add A Brand
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="size-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs">
                            <strong className="block font-medium">Eric Frusciante</strong>

                            <span>admin@admin.com</span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default AdminSideBar