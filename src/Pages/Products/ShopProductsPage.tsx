import ProductsContainer from "../../Components/Products/ProductsContainer"
import DropDown from "../../Utils/DropDown"
import SideFilter from "../../Components/Products/SideFilter"
import ViewSearchProductsHook from "../../Hooks/Products/View_Search_Products_Hook";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "../../Utils/Pagination";

function ShopProductsPage() {
    const [data, isLoading, isError, brands, isBrandLoading, isBrandError, categories, isCategoryLoading, isCategoryError, clickCategory, clickBrand,
        from, priceFrom, to, priceTo, sortData, totalPages, handlePageChange] = ViewSearchProductsHook()

    useEffect(() => {
        document.title = "Products Page";
    }, []);
    return (
        <div className=" border-t-2 mb-10 mt-3 py-2 min-h-[calc(70vh-100px)]">
            <DropDown sortData={sortData} />
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-5 mt-5'>
                <div>
                    <SideFilter brands={brands} isBrandLoading={isBrandLoading} isBrandError={isBrandError}
                        categories={categories} isCategoryLoading={isCategoryLoading} isCategoryError={isCategoryError}
                        clickCategory={clickCategory} clickBrand={clickBrand} from={from} to={to} priceFrom={priceFrom} priceTo={priceTo}
                    />
                </div>
                <div>
                    {data?.data.length === 0 ? (
                        <div className="flex items-center flex-col justify-between min-h-[200px] text-center text-gray-500">
                            <div>
                                <p className="text-lg font-semibold">No products found.</p>
                                <p className="mt-1">Try adjusting your filters or check back later.</p>
                            </div>
                            <Pagination totalPages={totalPages} onPageChange={handlePageChange} />

                        </div>
                    ) : (
                        <div>
                            <ProductsContainer items={data} isError={isError} isLoading={isLoading} title="" buttonTitle="" pathTitle="" />
                            <Pagination totalPages={totalPages} onPageChange={handlePageChange} />

                        </div>
                    )}
                </div>


            </div>

            <ToastContainer />
        </div>
    )
}

export default ShopProductsPage