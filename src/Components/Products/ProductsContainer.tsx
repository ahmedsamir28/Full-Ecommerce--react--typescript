import SubTitle from "../../Utils/SubTitle";
import ProductCard from "./ProductCard"

// Define prop types
interface proTitleProps {
  title: string;
  buttonTitle?: string;
  pathTitle?: string;
}
function ProductsContainer({ title, buttonTitle, pathTitle }: proTitleProps) {
  return (
    <div className="container">
      { title ? (
        <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
      ) : null}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>

  )
}

export default ProductsContainer