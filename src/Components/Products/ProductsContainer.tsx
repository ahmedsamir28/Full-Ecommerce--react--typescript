import { IProduct, IProducts } from "../../Interface";
import SubTitle from "../../Utils/SubTitle";
import ProductCard from "./ProductCard"

// Define prop types
interface proTitleProps {
  items: IProducts | undefined;
  isError:boolean
  isLoading:boolean
  title: string;
  buttonTitle?: string;
  pathTitle?: string;
}
function ProductsContainer({ items,isError,isLoading,title, buttonTitle, pathTitle }: proTitleProps) {

  return (
    <div className="container">
      { title ? (
        <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
      ) : null}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5'>
      {!isLoading && !isError && items?.data.slice(0,4).map((product: IProduct) => (
                    <ProductCard key={product._id} product={product} isLoading={isLoading} />
                ))}
      </div>
    </div>

  )
}

export default ProductsContainer