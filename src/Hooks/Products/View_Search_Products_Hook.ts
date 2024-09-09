import { ChangeEvent, useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../Redux/RTK Query/brands_slice";
import { useGetCategoriesQuery } from "../../Redux/RTK Query/categories_slice";
import { useGetProductsSearchQuery } from "../../Redux/RTK Query/products_slice";

function ViewSearchProductsHook() {
    const limit: number = 8; // Set a limit for the number of products to fetch

    // Fetch brands and categories using RTK query hooks
    const { data: brands, isLoading: isBrandLoading, isError: isBrandError } = useGetBrandsQuery();
    const { data: categories, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoriesQuery();

    // State to keep track of selected categories and brands for filtering
    const [categoryChecked, setCategoryChecked] = useState<string[]>([]);
    const [brandChecked, setBrandChecked] = useState<string[]>([]);

    // Function to handle category checkbox clicks
    const clickCategory = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // Get the value of the checkbox
        if (value === "0") {
            setCategoryChecked([]); // Reset categories if 'All' is selected
        } else {
            setCategoryChecked(prevState => 
                e.target.checked 
                    ? [...prevState, value] // Add the checked category to the state
                    : prevState.filter(item => item !== value) // Remove unchecked category from the state
            );
        }
    };

    // Generate the category query string based on selected categories
    const [cateQuery, setCateQuery] = useState<string>("");
    useEffect(() => {
        const query = categoryChecked.map(val => `category[in][]=${val}`).join("&"); // Create query string for selected categories
        setCateQuery(query); // Update the category query state
    }, [categoryChecked]); // Re-run effect when categoryChecked changes

    // Function to handle brand checkbox clicks
    const clickBrand = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // Get the value of the checkbox
        if (value === "0") {
            setBrandChecked([]); // Reset brands if 'All' is selected
        } else {
            setBrandChecked(prevState => 
                e.target.checked 
                    ? [...prevState, value] // Add the checked brand to the state
                    : prevState.filter(item => item !== value) // Remove unchecked brand from the state
            );
        }
    };

    // Generate the brand query string based on selected brands
    const [brandQuery, setBrandQuery] = useState<string>("");
    useEffect(() => {
        const query = brandChecked.map(val => `brand[in][]=${val}`).join("&"); // Create query string for selected brands
        setBrandQuery(query); // Update the brand query state
    }, [brandChecked]); // Re-run effect when brandChecked changes

    // Fetch products based on search word and selected category/brand filters
    const { data, isLoading, isError } = useGetProductsSearchQuery(`limit=${limit}&${cateQuery}&${brandQuery}`);

    // Return fetched data and states for use in the consuming component
    return [data, isLoading, isError, brands, isBrandLoading, isBrandError, categories, isCategoryLoading, isCategoryError, clickCategory, clickBrand] as const;
}

export default ViewSearchProductsHook;
