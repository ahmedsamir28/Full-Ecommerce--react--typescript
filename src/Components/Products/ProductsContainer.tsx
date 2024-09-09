import { IProduct, IProducts } from "../../Interface";
import SubTitle from "../../Utils/SubTitle";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

// Define prop types
interface ProTitleProps {
  items: IProducts | undefined;
  isError: boolean;
  isLoading: boolean;
  title: string;
  buttonTitle?: string;
  pathTitle?: string;
}

function ProductsContainer({ items, isError, isLoading, title, buttonTitle, pathTitle }: ProTitleProps) {
  const location = useLocation(); // get the current location
  let products: IProduct[] = [];

  // Check if items is defined to avoid potential errors
  if (items?.data) {
    if (location.pathname !== '/products') {
      products = items.data.slice(0, 4); // Show only the first 4 products for non-products page
    } else {
      products = items.data; // Show all products on the products page
    }
  }

  return (
    <div className="container">
      {title ? (
        <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5">
        {!isLoading && !isError && products.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} isLoading={isLoading} />
        ))}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading products...</p>}
      </div>
    </div>
  );
}

export default ProductsContainer;
