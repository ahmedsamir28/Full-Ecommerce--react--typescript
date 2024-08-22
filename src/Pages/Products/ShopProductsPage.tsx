import CategoryHeader from "../../Components/Categories/CategoryHeader"
import ProductsContainer from "../../Components/Products/ProductsContainer"
import DropDown from "../../Utils/DropDown"
import SideFilter from "../../Utils/SideFilter"

function ShopProductsPage() {
    return (
        <div className="container border-t-2 mb-10 mt-3 py-2">
            <CategoryHeader />
            <DropDown />
            <div className='flex justify-between items-center sm:items-start flex-col lg:flex-row mt-5'>
                <div className="">
                    <SideFilter />
                </div>
                <div className="">
                    <ProductsContainer title="" buttonTitle="" pathTitle="" />
                </div>
            </div>
        </div>
    )
}

export default ShopProductsPage