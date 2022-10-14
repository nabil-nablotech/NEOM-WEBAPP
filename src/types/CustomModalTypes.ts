import { ReactNode } from "react"

export type CustomModalTypes = {
    open: boolean
    handleClose: (e: React.MouseEvent) => void
    children: ReactNode
}