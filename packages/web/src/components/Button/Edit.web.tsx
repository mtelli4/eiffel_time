import { Edit2 } from "lucide-react"

interface EditProps {
  onEdit: () => void
  title?: string
}

export function Edit({ onEdit, title = 'Modifier' }: EditProps) {
  return (
    <button
      onClick={onEdit}
      className="p-1 text-[#3498DB] hover:text-[#2980B9] transition-colors"
      title={title}
    >
      <Edit2 className="w-4 h-4" />
    </button>
  )
}
