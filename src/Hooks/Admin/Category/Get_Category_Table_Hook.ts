import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";

function GetCategoryTableHook() {
    const { data, isError, isLoading } = useGetCategoriesQuery();

    // handle the date => 00/00/0000
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return [data, isError, isLoading, formatDate] as const
}

export default GetCategoryTableHook
