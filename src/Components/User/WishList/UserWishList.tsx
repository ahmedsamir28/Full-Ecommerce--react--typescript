import { useGetWishlistQuery } from "../../../Redux/RTK Query/wishlist_slice"
import ProductsContainer from "../../Products/ProductsContainer"

function UserWishList() {
    const { data, isError, isLoading  } = useGetWishlistQuery()

    return (
        <div className="container">
            <ProductsContainer items={data} isError={isError} isLoading={isLoading}  title="wishList" />
        </div>
    )
}

export default UserWishList
