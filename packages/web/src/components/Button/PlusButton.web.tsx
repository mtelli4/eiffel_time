import { Plus } from "lucide-react"

interface PlusButtonProps {
  color?: string
  size?: number
}

export default function PlusButton({ color = "#2E3494", size = 4 }: PlusButtonProps) {
  return (
    <div className={`text-${color} transition-colors w-${size} h-${size}`}>
      <Plus className="w-4 h-4" />
    </div>
  )
}
