import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  value?: number
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
  return (
    <div
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800/50",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export { Progress }
