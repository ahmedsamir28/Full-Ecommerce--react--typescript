import { Link } from 'react-router-dom';

// Define prop types
interface SubTitleProps {
    title: string;
    buttonTitle?: string;
    pathText?: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ title, buttonTitle, pathText }) => {
    return (
        <>
            <div className="container flex justify-between items-center">
                <h6 className="capitalize text-md xl:text-xl font-bold"> {title} </h6>
                {buttonTitle && pathText ? (
                    <Link to={pathText}>
                        <div className="capitalize text-sm sm:text-sm hover:text-blue-700 cursor-pointer border-2 py-2 px-3 rounded-md">
                            {buttonTitle} 
                        </div>
                    </Link>
                ) : null}
            </div>
        </>
    );
}

export default SubTitle;
