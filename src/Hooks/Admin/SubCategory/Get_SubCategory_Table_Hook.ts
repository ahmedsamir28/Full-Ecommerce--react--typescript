import { useGetSubCategoriesQuery } from "../../../Redux/RTK Query/subCategory_slice";

function GetSubCategoryTableHook() {
    // Fetch subcategories data along with loading and error states
    const { data, isError, isLoading } = useGetSubCategoriesQuery();

    // Function to format date from a string to "YYYY-MM-DD" format
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString); // Convert string to Date object
        const year = date.getFullYear(); // Get the full year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-indexed) and format to 2 digits
        const day = date.getDate().toString().padStart(2, '0'); // Get the day and format to 2 digits
        return `${year}-${month}-${day}`; // Return formatted date as a string
    };

    // Return fetched data and utility functions for use in the consuming component
    return [data, isError, isLoading, formatDate] as const

}
export default GetSubCategoryTableHook
