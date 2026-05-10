import { BrainCircuit } from "lucide-react"

interface AuthHeaderProps {
  title: string
  description: string
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <>
      {/* Logo Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl logo-gradient flex items-center justify-center shadow-sm">
          <BrainCircuit className="text-white size-6" />
        </div>
        <h1 className="text-[22px] font-semibold tracking-[-0.3px] text-foreground font-sans">
          AI Q-Gen
        </h1>
      </div>

      {/* Title & Description */}
      <div>
        <h2 className="text-[26px] font-bold tracking-[-0.4px] text-foreground mb-1 font-sans">
          {title}
        </h2>
        <p className="text-[14px] text-muted-foreground font-sans">
          {description}
        </p>
      </div>
    </>
  )
}
