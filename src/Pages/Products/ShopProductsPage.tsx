import CategoryHeader from "../../Components/Categories/CategoryHeader"
import ProductsContainer from "../../Components/Products/ProductsContainer"
import DropDown from "../../Utils/DropDown"
import SideFilter from "../../Components/Products/SideFilter"
import ViewSearchProductsHook from "../../Hooks/Products/View_Search_Products_Hook";

function ShopProductsPage() {

const [data, isLoading, isError] = ViewSearchProductsHook('gholmish')
    return (
        <div className="container border-t-2 mb-10 mt-3 py-2">
            <CategoryHeader />
            <DropDown />
            <div className='flex justify-between items-center sm:items-start flex-col lg:flex-row mt-5'>
                <div className="">
                    <SideFilter />
                </div>
                <div className="">
                    <ProductsContainer items={data} isError={isError} isLoading={isLoading} title="" buttonTitle="" pathTitle="" />
                </div>
            </div>
        </div>
    )
}

export default ShopProductsPage