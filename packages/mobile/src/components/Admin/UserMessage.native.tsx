import { Utilisateur, UserUpdate } from "../../../../shared/src/types/types"

interface UserMessageProps {
    isOpen: boolean
    pastUser: Utilisateur
    newUser: UserUpdate
}

export function UserMessage({ isOpen, pastUser, newUser }: UserMessageProps) {
    return (
        <div>
        <h1>UserTable</h1>
        </div>
    )
}