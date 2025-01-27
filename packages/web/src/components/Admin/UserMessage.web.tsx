import { ToastContainer, toast } from 'react-toastify';
import { UserUpdate, Utilisateur } from "../../../../shared/src/types/types"

interface UserMessageProps {
    isOpen: boolean
    pastUser: Utilisateur
    newUser: UserUpdate
}

export function UserMessage({ isOpen, pastUser, newUser }: UserMessageProps) {
    const notify = () => toast("Wow so easy !", { position: 'top-center' });

    if (!isOpen) return null

    return (
        <div>
            <h1>UserTable</h1>
            <ToastContainer />
            <button onClick={notify}>Notify !</button>
        </div>
    )
}