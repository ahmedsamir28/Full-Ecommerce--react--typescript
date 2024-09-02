import { useGetSubCategoriesQuery } from "../../../Redux/RTK Query/subCategory_slice";

function GetSubCategoryTableHook() {
    const { data, isError, isLoading } = useGetSubCategoriesQuery();
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
export default GetSubCategoryTableHook
