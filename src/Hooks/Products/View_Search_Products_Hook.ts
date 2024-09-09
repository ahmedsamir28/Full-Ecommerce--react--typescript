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
                e.target.checked ? [...prevState, value] // Add the checked category to the state
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


    const [from, setFrom] = useState<number | undefined>(undefined);
    const [to, setTo] = useState<number | undefined>(undefined);

    // Handler for the 'from & to' price input change
    const priceFrom = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Convert the value to a number if it's not empty, otherwise set it to undefined
        const numericValue = value ? Number(value) : undefined;
        setFrom(numericValue);
    };

    const priceTo = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Convert the value to a number if it's not empty, otherwise set it to undefined
        const numericValue = value ? Number(value) : undefined;
        setTo(numericValue);
    };


    let priceFromString = "";
    let priceToString = "";

    // Construct the priceFrom query string if 'from' is set and greater than 0
    if (from !== undefined && from > 0) {
        priceFromString = `&price[gt]=${from}`; // Greater than condition
    }

    // Construct the priceTo query string if 'to' is set and greater than 0
    if (to !== undefined && to > 0) {
        priceToString = `&price[lte]=${to}`; // Less than or equal condition
    }


    // State to hold the selected sort type, initially an empty string
    const [sort, setSort] = useState<string>("");

    // Function to handle the sort selection based on the provided type
    const sortData = (type: string | null) => {
        // Initialize an empty string for sortType
        let sortType = '';

        // Check the type and assign the appropriate sort value
        if (type === "Price from low to high") {
            sortType = "+price"; // Sort by price in ascending order
        } else if (type === "Price from high to low") {
            sortType = "-price"; // Sort by price in descending order
        } else if (type === "best seller") {
            sortType = "-sold"; // Sort by the number of items sold in descending order
        } else if (type === "top rated") {
            sortType = "-quantity"; // Sort by the top-rated items (by quantity sold)
        }

        // Update the state with the new sort value
        setSort(sortType);
    }

    // Generate the sort query string based on the selected sort value
    // If sort is not empty, append the sort parameter to the query string, otherwise leave it empty
    const sortQuery = sort ? `&sort=${sort}` : "";

    // Fetch products based on search word and selected category/brand filters
    const { data, isLoading, isError } = useGetProductsSearchQuery(
        `limit=${limit}&${cateQuery}&${brandQuery}&${priceFromString}&${priceToString}${sortQuery}`
    );

    // Return fetched data and states for use in the consuming component
    return [data, isLoading, isError, brands, isBrandLoading, isBrandError, categories, isCategoryLoading, isCategoryError, clickCategory, clickBrand,
        from, priceFrom, to, priceTo, sortData
    ] as const;
}

export default ViewSearchProductsHook;
