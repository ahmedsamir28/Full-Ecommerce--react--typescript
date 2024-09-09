import CategoryHeader from "../../Components/Categories/CategoryHeader"
import ProductsContainer from "../../Components/Products/ProductsContainer"
import DropDown from "../../Utils/DropDown"
import SideFilter from "../../Components/Products/SideFilter"
import ViewSearchProductsHook from "../../Hooks/Products/View_Search_Products_Hook";
import { useEffect } from "react";

function ShopProductsPage() {
    useEffect(() => {
        document.title = "Products Page";
    }, []);

    const [data, isLoading, isError, brands, isBrandLoading, isBrandError, categories, isCategoryLoading, isCategoryError, clickCategory, clickBrand, from, priceFrom, to, priceTo,sortData] = ViewSearchProductsHook()
    return (
        <div className="container border-t-2 mb-10 mt-3 py-2 min-h-[calc(70vh-100px)]">
            <CategoryHeader />
            <DropDown sortData={sortData} />
            <div className='flex justify-between items-center sm:items-start flex-col lg:flex-row mt-5'>
                <div className="">
                    <SideFilter brands={brands} isBrandLoading={isBrandLoading} isBrandError={isBrandError}
                        categories={categories} isCategoryLoading={isCategoryLoading} isCategoryError={isCategoryError}
                        clickCategory={clickCategory} clickBrand={clickBrand} from={from} to={to} priceFrom={priceFrom} priceTo={priceTo}
                    />
                </div>
                <div className="">
                    <ProductsContainer items={data} isError={isError} isLoading={isLoading} title="" buttonTitle="" pathTitle="" />
                </div>
            </div>
        </div>
    )
}

export default ShopProductsPage