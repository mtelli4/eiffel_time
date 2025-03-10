import { FileDown } from "lucide-react"

interface FileDownButtonProps {
  color?: string
  size?: number
}

export function FileDownButton({ color = "#2E3494", size = 4 }: FileDownButtonProps) {
  return (
    <div className={`text-[${color}] transition-colors`}>
      <FileDown className='w-4 h-4' />
    </div>
  )
}
