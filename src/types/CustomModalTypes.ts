import { ReactNode } from "react"

export type CustomModalTypes = {
    open: boolean
    handleClose: (e: React.MouseEvent) => void
    children: ReactNode
    titleContent?: ReactNode
}
export type ConfirmationModalTypes = {
    type: "confirm-edit" | "confirm-logout"
    open: boolean
    handleClose: (e: React.MouseEvent) => void
}