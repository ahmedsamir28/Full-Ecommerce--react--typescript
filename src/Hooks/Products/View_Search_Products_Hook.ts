import { useGetProductsSearchQuery } from "../../Redux/RTK Query/products_slice";

function ViewSearchProductsHook(searchWord: string) {
    const limit: number = 8;

    // Fetch products based on the current search word
    const { data, isLoading, isError } = useGetProductsSearchQuery(`limit=${limit}&keyword=${searchWord}`);

    return [data, isLoading, isError] as const;
}

export default ViewSearchProductsHook;
