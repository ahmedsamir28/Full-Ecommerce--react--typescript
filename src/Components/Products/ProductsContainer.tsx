import { IProduct } from "../../Interface";
import { useGetProductsQuery } from "../../Redux/RTK Query/products_slice";
import SubTitle from "../../Utils/SubTitle";
import ProductCard from "./ProductCard"

// Define prop types
interface proTitleProps {
  title: string;
  buttonTitle?: string;
  pathTitle?: string;
}
function ProductsContainer({ title, buttonTitle, pathTitle }: proTitleProps) {
  const { data, isError, isLoading } = useGetProductsQuery();

  return (
    <div className="container">
      { title ? (
        <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
      ) : null}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5'>
      {!isLoading && !isError && data?.data.slice(0,8).map((product: IProduct) => (
                    <ProductCard key={product._id} product={product} isLoading={isLoading} />
                ))}
      </div>
    </div>

  )
}

export default ProductsContainer