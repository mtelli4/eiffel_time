import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserMessageProps {
    type: 'success' | 'error'
    message: string
}

export function UserMessage({ type, message }: UserMessageProps) {
    if (type === 'success') {
        toast.success(message, {
            position: 'bottom-right',
        });
    } else {
        toast.error(message, {
            position: 'bottom-right',
        });
    }
}

export default function UserMessageContainer() {
    return <ToastContainer />;
}
