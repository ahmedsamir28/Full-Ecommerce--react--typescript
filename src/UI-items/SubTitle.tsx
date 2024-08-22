import { Link } from 'react-router-dom';
import Button from './Button';

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
                <h6 className="capitalize text-md xs:text-4xl font-semibold"> {title} </h6>
                {buttonTitle && pathText ? (
                    <Link to={pathText}>
                        <Button className="capitalize text-sm sm:text-sm hover:text-blue-700 cursor-pointer">
                            {buttonTitle} <i className="ml-2 fa-solid fa-arrow-right-long"></i>
                        </Button>
                    </Link>
                ) : null}
            </div>
        </>
    );
}

export default SubTitle;
