import { useEffect } from "react"
import BrandFeatures from "../../Components/Brands/BrandFeatures"
import CategoryHome from "../../Components/Home/CategoryHome"
import DiscountSection from "../../Components/Home/DiscountSection"
import ProductsContainer from "../../Components/Products/ProductsContainer"
import Landing from "../../Layouts/Landing"

function HomePage() {
  useEffect(() => {
    document.title = "Home Page";
}, []);

  return (
    <>
      <Landing />
      <CategoryHome title="categories name" buttonTitle="more of categories" pathTitle="/categories" />
      <ProductsContainer title="best seller" buttonTitle="more of products" pathTitle="/products" />
      <DiscountSection />
      <BrandFeatures title="brands name" buttonTitle="more of brands" pathTitle="/brands"/>
    </>

  )
}

export default HomePage