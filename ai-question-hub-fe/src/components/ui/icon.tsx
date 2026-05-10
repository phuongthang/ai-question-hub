import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700
  fill?: boolean
}

export function Icon({ name, weight = 400, fill, className, ...props }: IconProps) {
  // Automatically map Tailwind size-* to a relative font-size to ensure perfectly scaled 
  // and aligned icons similar to SVGs.
  let fontSize = undefined;
  if (className) {
    const match = className.match(/size-([0-9.]+)/);
    if (match) {
      const val = parseFloat(match[1]);
      // Scale visual size up by 1.25x compared to bounding box to match SVG visual weight
      fontSize = `${(val / 4) * 1.25}rem`; 
    }
  }

  const fontVariationSettings = []
  if (fill) fontVariationSettings.push("'FILL' 1")
  fontVariationSettings.push(`'wght' ${weight}`)

  return (
    <span
      className={cn("material-symbols-outlined shrink-0 select-none", fill && "fill", className)}
      style={{
        ...props.style,
        fontVariationSettings: fontVariationSettings.length > 0 ? fontVariationSettings.join(", ") : undefined,
        ...(fontSize ? { fontSize } : {}),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1
      }}
      data-icon={name}
      data-weight={fill ? "fill" : undefined}
      {...props}
    >
      {name}
    </span>
  )
}
