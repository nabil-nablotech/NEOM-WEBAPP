export type CustomDrawerProps = {
    origin: "top" | "right" | "bottom" | "left" | undefined
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export type AddNewItemProps = {
    onClose: () => void
}

export type StepContentTypes = {
    formState: any
    setFormState: React.SetStateAction<any> 
    activeStep: number
    steps: Array<string>
    handleNext: () => void
    handleBack:  () => void
}