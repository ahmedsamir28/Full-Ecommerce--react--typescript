import { useEffect } from "react";
import CategoryContainer from "../../Components/Categories/CategoryContainer"

function CategoriesPage() {
    useEffect(() => {
        document.title = "Categories Page";
    }, []);
    return (
        <div className="min-h-[calc(80vh-100px)] border-t-2 mb-10 mt-3 py-5">
            <CategoryContainer />
        </div>
    )
}

export default CategoriesPage