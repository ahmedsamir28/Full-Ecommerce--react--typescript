import { useGetBrandsQuery } from "../../../Redux/RTK Query/brands_slice";

function GetBrandTableHook() {
    const { data, isError, isLoading } = useGetBrandsQuery();

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return [data, isError, isLoading, formatDate] as const;
}

export default GetBrandTableHook;
