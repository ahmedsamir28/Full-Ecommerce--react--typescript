import SubTitle from "../../Utils/SubTitle";
import CategoryCard from "../Categories/CategoryCard"

// Define prop types
interface cateTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function CategoryHome({ title, buttonTitle, pathTitle }: cateTitleProps) {
    return (
        <div className="mt-5 container">
            <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
            <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 m-5'>
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </div>

    )
}

export default CategoryHome