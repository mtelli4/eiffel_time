import { UserFiltersProps } from '@shared/types/types'
import { Search } from 'lucide-react'
import Select from 'react-select'
import { ROLES } from '@shared/types/types'
import { useEffect, useState } from 'react'
import { Groupe } from '@shared/backend/classes'
import { formation, groupe } from '@prisma/client'

const FORMATIONS = [
    { value: 'info', label: 'Informatique' },
    { value: 'gea', label: 'GEA' },
    { value: 'tc', label: 'TC' },
]

const TEACHER_TYPES = [
    { value: 'permanent', label: 'Titulaire' },
    { value: 'temporary', label: 'Vacataire' },
]

export function UserFilters({ onRoleChange, onGroupChange, onFormationChange, onTypeChange, onSearch, }: UserFiltersProps) {
    const [groupes, setGroupes] = useState([])
    const [formations, setFormations] = useState([])

    const handleSearchChange = (e: any) => {
        onSearch(e.target.value)
    }

    useEffect(() => {
        // Effectuer la requête GET pour récupérer les utilisateurs
        fetch('http://localhost:4000/api/data') // URL de votre API
            .then((response) => {
                // Vérifier si la réponse est correcte
                if (!response.ok) {
                    throw new Error('Erreur réseau')
                }
                return response.json() // Convertir la réponse en JSON
            })
            .then((data) => {
                const groupes = data.groupes.map((g: groupe) => { return { value: g.id_grp, label: g.libelle }})
                setGroupes(groupes)
                const formations = data.formations.map((f: formation) => { return { value: f.id_formation, label: f.libelle }})
                setFormations(formations)
            })
            .catch((error) => {
                console.error(
                    'Erreur lors de la récupération des utilisateurs:',
                    error
                )
            })
    }, [])

    return (
        <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                        Rôle
                    </label>
                    <Select
                        options={ROLES}
                        isClearable
                        placeholder="Tous les rôles"
                        onChange={(option) => onRoleChange(option?.value || null)}
                        className="text-sm"
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: '#E2E8F0',
                                '&:hover': {
                                    borderColor: '#3498DB',
                                },
                            }),
                        }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                        Groupe
                    </label>
                    <Select
                        options={groupes}
                        isClearable
                        placeholder="Tous les groupes"
                        onChange={(option: any) => onGroupChange(option?.value || null)}
                        className="text-sm"
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: '#E2E8F0',
                                '&:hover': {
                                    borderColor: '#3498DB',
                                },
                            }),
                        }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                        Formation
                    </label>
                    <Select
                        options={formations}
                        isClearable
                        placeholder="Toutes les formations"
                        onChange={(option: any) => onFormationChange(option?.value || null)}
                        className="text-sm"
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: '#E2E8F0',
                                '&:hover': {
                                    borderColor: '#3498DB',
                                },
                            }),
                        }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                        Type de professeur
                    </label>
                    <Select
                        options={TEACHER_TYPES}
                        isClearable
                        placeholder="Tous les types"
                        onChange={(option) => onTypeChange(option?.value || null)}
                        className="text-sm"
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: '#E2E8F0',
                                '&:hover': {
                                    borderColor: '#3498DB',
                                },
                            }),
                        }}
                    />
                </div>
            </div>

            <div className="relative">
                <input
                    /* add id ##search_box */
                    id="search_box"
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" onChange={handleSearchChange} />
            </div>
        </div>
    )
}
