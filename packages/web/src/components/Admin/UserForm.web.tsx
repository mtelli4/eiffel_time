import { ROLES } from '@shared/types/types'
import { X } from 'lucide-react'
import Select from 'react-select'

interface UserFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => void
    initialData?: any
    isEdit?: boolean
}

export function UserForm({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEdit,
}: UserFormProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#2C3E50]">
                        {isEdit ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                            ID
                        </label>
                        <input
                            type="text"
                            defaultValue={initialData?.id}
                            className="w-full rounded-lg border-gray-200 focus:ring-[#3498DB] focus:border-[#3498DB]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                            Nom
                        </label>
                        <input
                            type="text"
                            defaultValue={initialData?.name}
                            className="w-full rounded-lg border-gray-200 focus:ring-[#3498DB] focus:border-[#3498DB]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                            Prénom
                        </label>
                        <input
                            type="text"
                            defaultValue={initialData?.firstname}
                            className="w-full rounded-lg border-gray-200 focus:ring-[#3498DB] focus:border-[#3498DB]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            defaultValue={initialData?.email}
                            className="w-full rounded-lg border-gray-200 focus:ring-[#3498DB] focus:border-[#3498DB]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                            Rôle
                        </label>
                        <Select
                            options={ROLES}
                            defaultValue={{
                                value: initialData?.role,
                                label: initialData?.role,
                            }}
                            className="text-sm"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-[#2C3E50] bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-primary hover:bg-[#2980B9] rounded-lg transition-colors"
                        >
                            {isEdit ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
