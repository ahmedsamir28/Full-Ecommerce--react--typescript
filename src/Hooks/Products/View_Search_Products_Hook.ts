import { ChangeEvent, useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../Redux/RTK Query/brands_slice";
import { useGetCategoriesQuery } from "../../Redux/RTK Query/categories_slice";
import { useGetProductsSearchQuery } from "../../Redux/RTK Query/products_slice";

function ViewSearchProductsHook() {
    const limit: number = 8;

    const [page ,setPage] = useState <number>()
    const { data: brands, isLoading: isBrandLoading, isError: isBrandError } = useGetBrandsQuery();
    const { data: categories, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoriesQuery();

    const [categoryChecked, setCategoryChecked] = useState<string[]>([]);
    const [brandChecked, setBrandChecked] = useState<string[]>([]);

    const clickCategory = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "0") {
            setCategoryChecked([]);
        } else {
            setCategoryChecked(prevState =>
                e.target.checked ? [...prevState, value] : prevState.filter(item => item !== value)
            );
        }
    };

    const [cateQuery, setCateQuery] = useState<string>("");
    useEffect(() => {
        const query = categoryChecked.map(val => `category[in][]=${val}`).join("&");
        setCateQuery(query);
    }, [categoryChecked]);

    const clickBrand = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "0") {
            setBrandChecked([]);
        } else {
            setBrandChecked(prevState =>
                e.target.checked ? [...prevState, value] : prevState.filter(item => item !== value)
            );
        }
    };

    const [brandQuery, setBrandQuery] = useState<string>("");
    useEffect(() => {
        const query = brandChecked.map(val => `brand[in][]=${val}`).join("&");
        setBrandQuery(query);
    }, [brandChecked]);

    const [from, setFrom] = useState<number | undefined>(undefined);
    const [to, setTo] = useState<number | undefined>(undefined);

    const priceFrom = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value ? Number(value) : undefined;
        setFrom(numericValue);
    };

    const priceTo = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value ? Number(value) : undefined;
        setTo(numericValue);
    };

    let priceFromString = "";
    let priceToString = "";

    if (from !== undefined && from > 0) {
        priceFromString = `&price[gt]=${from}`;
    }

    if (to !== undefined && to > 0) {
        priceToString = `&price[lte]=${to}`;
    }

    const [sort, setSort] = useState<string>("");

    const sortData = (type: string | null) => {
        let sortType = '';
        if (type === "Price from low to high") {
            sortType = "+price";
        } else if (type === "Price from high to low") {
            sortType = "-price";
        } else if (type === "best seller") {
            sortType = "-sold";
        } else if (type === "top rated") {
            sortType = "-quantity";
        }
        setSort(sortType);
    }

    const sortQuery = sort ? `&sort=${sort}` : "";

    const { data, isLoading, isError } = useGetProductsSearchQuery(
        `limit=${limit}&page=${page}&${cateQuery}&${brandQuery}&${priceFromString}&${priceToString}${sortQuery}`
    );

    const totalPages: number = Number(data?.results)

    const handlePageChange = (page: number) => {
        console.log("Current Page:", page);
        setPage(page)
    };

    return [data, isLoading, isError, brands, isBrandLoading, isBrandError, categories, isCategoryLoading, isCategoryError, clickCategory, clickBrand,
        from, priceFrom, to, priceTo, sortData, totalPages, handlePageChange
    ] as const;
}

export default ViewSearchProductsHook;
