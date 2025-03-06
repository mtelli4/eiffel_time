import { FileDown } from "lucide-react"

interface PlusButtonProps {
  color?: string
  size?: number
}

export default function PlusButton({ color = "#2E3494", size = 4 }: PlusButtonProps) {
  return (
    <div className={`text-red transition-colors`}>
      <FileDown className={`w-${size} h-${size} text-${color}`} />
    </div>
  )
}
