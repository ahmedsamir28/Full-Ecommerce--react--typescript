interface IProps {
    url: string | undefined;
    alt: string;
    className: string;
    onClick?: () => void; 
}

const Image = ({ url, alt, className, onClick }: IProps) => {
    return (
        <img src={url} alt={alt} className={className} onClick={onClick} />
    );
}

export default Image;
