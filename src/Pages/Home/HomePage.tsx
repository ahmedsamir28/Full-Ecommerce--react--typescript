import { useEffect } from "react"
import BrandFeatures from "../../Components/Brands/BrandFeatures"
import CategoryHome from "../../Components/Home/CategoryHome"
import DiscountSection from "../../Components/Home/DiscountSection"
import ProductsContainer from "../../Components/Products/ProductsContainer"
import Landing from "../../Layouts/Landing"
import { useGetProductsQuery } from "../../Redux/RTK Query/products_slice"
import { ToastContainer } from "react-toastify"

function HomePage() {
  useEffect(() => {
    document.title = "Home Page";
  }, []);

  const { data, isError, isLoading } = useGetProductsQuery();

  
  return (
    <>
      <Landing />
      <CategoryHome title="categories name" buttonTitle="more of categories" pathTitle="/categories" />
      <ProductsContainer items={data} isError={isError} isLoading={isLoading} title="best seller" buttonTitle="more of products" pathTitle="/products"
      />
      <DiscountSection />
      <BrandFeatures title="brands name" buttonTitle="more of brands" pathTitle="/brands" />
      <ToastContainer/>
    </>
  );
}

export default HomePage