import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
    msg: string;
    type: 'warn' | 'success' | 'error';
}

// Function to show toast notifications
const Notify = ({ msg, type }: IProps) => {
    if (type === "warn") {
        toast.warn(msg);
    } else if (type === "success") {
        toast.success(msg);
    } else if (type === "error") {
        toast.error(msg);
    }
};

export default Notify;
