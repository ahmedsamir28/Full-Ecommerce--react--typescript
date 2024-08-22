import ProductDetails from "../../Components/Products/product-details/ProductDetails";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import RateContainer from "../../Components/Rate/RateContainer";

function ProductDetailsPage() {
  return (
    <div className="container mb-10 border-t-2 mt-3">
      <ProductDetails />
      <RateContainer />
      <div className="mt-5">
        <ProductsContainer title="Products you may like" buttonTitle="" pathTitle="" />
      </div>
    </div>
  )
}

export default ProductDetailsPage