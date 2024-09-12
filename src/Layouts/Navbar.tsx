import { Link, useNavigate } from "react-router-dom";
import NavbarSearchHook from "../Hooks/Navbar/Navbar_Search_Hook";
import { IProduct } from "../Interface";
import { useGetProductsSearchQuery } from "../Redux/RTK Query/products_slice";

function Navbar() {
    const storageKey = "user";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/auth/login";  
    };
    

    const [searchWord, onChangeSearch, searchBar, setSearchBar] = NavbarSearchHook(); // Add setSearchBar
    const { data, isLoading, isError } = useGetProductsSearchQuery(`keyword=${searchWord}`);
    const navigate = useNavigate(); // Add useNavigate for navigation

    const handleProductClick = (productId: string) => {
        setSearchBar(false); // Hide the search bar
        navigate(`/product-details/${productId}`); // Navigate to product details
    };

    return (
        <div className="container">
            <div className="navbar bg-base-100 flex justify-between gap-2 item-center ">

                <div className="">
                    <Link to="/" className="btn btn-ghost text-xl">E-commerce</Link>
                </div>

                <div className='w-[800px] hidden md:block mx-auto border-2 rounded-lg relative'>
                    <input
                        value={searchWord}
                        onChange={onChangeSearch}
                        type="text"
                        className="w-full h-10 px-4 py-2 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search..."
                    />
                    {searchBar && data && data.data.length > 0 && (
                        <div className="absolute top-12 bg-zinc-200 w-full py-2 px-5 z-50 rounded-md flex flex-col items-start border border-zinc-300">
                            {isLoading && <p>Loading...</p>}
                            {isError && <p>Error fetching products</p>}
                            {data.data.map((product: IProduct) => (
                                <div
                                    key={product._id}
                                    className="w-full pl-3 py-1 hover:bg-gray-300 capitalize text-lg font-normal text-zinc-600 cursor-pointer"
                                    onClick={() => handleProductClick(product._id)} // Call handleProductClick
                                >
                                    {product.title}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-400">
                        <Link to="/user/wish-list" className="text-sm">WishList</Link>
                        <div className="relative">
                            <i className="fa-regular fa-heart text-lg"></i>
                            <span className="absolute bottom-3 left-2.5 bg-zinc-300 text-sm font-semibold border-2 px-1.5 rounded-full">8</span>
                        </div>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item text-sm px-1.5 py-2.5 bg-zinc-300">8</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        userData ? (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {
                                    userData.role === "admin" ? (<li><Link to="/admin/dash-board" className="justify-between">control panel<span className="badge">New</span></Link></li>
                                    ) : (<li><Link to="/user/orders" className="justify-between">profile page<span className="badge">New</span></Link></li>
                                    )
                                }
                                {/* <li><a>Settings</a></li> */}
                                <li onClick={logOut}><Link to="/auth/login">Logout</Link></li>
                            </ul>
                        </div>) : (
                            <div >
                                <Link to="/auth/login">
                                    <div className="flex items-center gap-2 cursor-pointer hover:text-zinc-500">
                                        <i className="fa-regular fa-user text-xl "></i> <div>Login</div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }



                </div>


            </div>

            {/* Search Bar for mobile */}
            <div className='w-full md:hidden mx-auto border-2 rounded-lg relative'>
                <input
                    value={searchWord}
                    onChange={onChangeSearch}
                    type="text"
                    className="w-full h-10 px-4 py-2 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search..."
                />
                {searchBar && data && data.data.length > 0 && (
                    <div className="absolute top-12 bg-zinc-200 w-full py-2 px-5 z-50 rounded-md flex flex-col items-start border border-zinc-300">
                        {isLoading && <p>Loading...</p>}
                        {isError && <p>Error fetching products</p>}
                        {data.data.map((product: IProduct) => (
                            <div
                                key={product._id}
                                className="w-full pl-3 py-1 hover:bg-gray-300 capitalize text-lg font-normal text-zinc-600 cursor-pointer"
                                onClick={() => handleProductClick(product._id)} // Call handleProductClick
                            >
                                {product.title}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Navbar;
