import { Trash2 } from 'lucide-react'

interface DeleteProps {
  onDelete: () => void
  title?: string
  confirmMessage?: string
}

export function Delete({ onDelete, title = 'Supprimer', confirmMessage = 'Êtes-vous sûr de vouloir supprimer cet élément ?' }: DeleteProps) {
  const handleDelete = () => {
    if (window.confirm(confirmMessage)) {
      onDelete()
    }
  }

  return (
    <button onClick={handleDelete} className="p-1 text-[#E74C3C] hover:text-[#C0392B] transition-colors" title={title}>
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
