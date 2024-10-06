import { useEffect } from "react";
import ProductDetails from "../../Components/Products/product-details/ProductDetails";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import RateContainer from "../../Components/Rate/RateContainer";
import { useGetProductsQuery } from "../../Redux/RTK Query/products_slice";
import { ToastContainer } from "react-toastify";

function ProductDetailsPage() {
  useEffect(() => {
    document.title = "Products Details Page";
  }, []);
  const { data, isError, isLoading } = useGetProductsQuery();

  return (
    <div className="container mb-10 border-t-2 mt-5">
      <ProductDetails />
      <RateContainer />
      <div className="mt-5">
        <ProductsContainer items={data} isError={isError} isLoading={isLoading} title="Products you may like" buttonTitle="" pathTitle="" />
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ProductDetailsPage