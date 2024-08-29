
interface IProps {
    message?: string
}

const InputErrorMessage = ({ message }: IProps) => {
    return message ? (
        <span className="block mt-2 text-red-700 font-semibold text-sm">{message}</span>
    ) : null;
}

export default InputErrorMessage