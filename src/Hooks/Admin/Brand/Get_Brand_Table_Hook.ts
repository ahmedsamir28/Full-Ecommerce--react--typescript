import { useGetBrandsQuery } from "../../../Redux/RTK Query/brands_slice";

function GetBrandTableHook() {
    // Use RTK Query to fetch the list of brands
    const { data, isError, isLoading } = useGetBrandsQuery();

    // Function to format date from ISO string to "YYYY-MM-DD"
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString); // Convert the date string to a JavaScript Date object
        const year = date.getFullYear(); // Get the full year (YYYY)
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (MM) and pad with zero if needed
        const day = date.getDate().toString().padStart(2, '0'); // Get the day (DD) and pad with zero if needed
        return `${year}-${month}-${day}`; // Return the formatted date as "YYYY-MM-DD"
    };

    // Return the data, error state, loading state, and the date formatting function
    return [data, isError, isLoading, formatDate] as const;
}

export default GetBrandTableHook;
