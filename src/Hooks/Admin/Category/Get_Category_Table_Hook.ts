import { useGetCategoriesQuery } from "../../../Redux/RTK Query/categories_slice";

function GetCategoryTableHook() {
    // Fetching category data using RTK Query hook
    const { data, isError, isLoading } = useGetCategoriesQuery();

    // Function to format the date into a 'YYYY-MM-DD' string
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);  // Convert the string into a Date object
        const year = date.getFullYear();  // Extract the year from the Date object
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Extract the month and pad with '0' if necessary
        const day = date.getDate().toString().padStart(2, '0');  // Extract the day and pad with '0' if necessary
        return `${year}-${month}-${day}`;  // Return formatted date string
    };

    // Return category data, error/loading state, and date formatting function
    return [data, isError, isLoading, formatDate] as const;
}

export default GetCategoryTableHook;
