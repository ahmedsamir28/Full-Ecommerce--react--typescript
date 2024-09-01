import { useEffect } from "react";
import { useGetCategoriesQuery } from "../../Redux/RTK Query/categories_slice";
import SubTitle from "../../Utils/SubTitle";
import CategoryCard from "../Categories/CategoryCard";
import { ICategory } from "../../Interface";

interface cateTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}

function CategoryHome({ title, buttonTitle, pathTitle }: cateTitleProps) {
    const { data, isError, isLoading } = useGetCategoriesQuery();

    useEffect(() => {
        document.title = "Home Page";
    }, []);

    // useEffect(() => {
    //     if (!isLoading && !isError && data) {
    //         console.log("Fetched data:", data);
    //     }
    // }, [data, isLoading, isError]);

    return (
        <div className="mt-5 container">
            <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
            {!isLoading && isError && <p className="text-center text-error" >There is no data</p>}

            <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 m-5 rounded-md">

                {!isLoading &&
                    !isError &&
                    data &&
                    data.data.slice(0, 4).map((category: ICategory) => (
                        <CategoryCard key={category._id} category={category} isLoading={isLoading} />
                    ))}
            </div>
        </div>
    );
}

export default CategoryHome;
