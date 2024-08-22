import SubTitle from "../../UI-items/SubTitle";
import BrandCard from "./BrandCard"

// Define prop types
interface brandTitleProps {
    title: string;
    buttonTitle?: string;
    pathTitle?: string;
}
function BrandFeatures({ title, buttonTitle, pathTitle }: brandTitleProps) {
    return (
        <div className="container mt-5 mb-10">
            <SubTitle title={title} buttonTitle={buttonTitle} pathText={pathTitle} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5">
                <BrandCard />
                <BrandCard />
                <BrandCard />
                <BrandCard />
                <BrandCard />
                <BrandCard />
                <BrandCard />
                <BrandCard />
            </div>
        </div>
    )
}

export default BrandFeatures