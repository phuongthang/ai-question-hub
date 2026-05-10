import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarFallback, stringToColor } from "@/lib/utils"

interface UserAvatarProps extends React.ComponentProps<typeof Avatar> {
  src?: string | null
  name?: string
  userCode?: string
}

export function UserAvatar({ src, name, userCode, className, ...props }: UserAvatarProps) {
  const fallback = React.useMemo(() => getAvatarFallback(name), [name])
  const bgColor = React.useMemo(() => stringToColor(userCode || name), [userCode, name])

  return (
    <Avatar className={className} {...props}>
      {src ? <AvatarImage src={src} alt={name || "User Avatar"} /> : null}
      <AvatarFallback 
        style={{ backgroundColor: bgColor }}
        className="text-white font-semibold shadow-inner"
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
