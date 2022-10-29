import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables } from "@apollo/client"
import { MutateFunction } from "react-query"
import { AddEventState } from "../store/reducers/eventReducer"
import { Options } from "./RefinedSeachTypes"
import { tabNameProps } from "./SearchResultsTabsProps"

export type CustomDrawerProps = {
    origin: "top" | "right" | "bottom" | "left" | undefined
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export type AddNewItemProps = {
    onClose: () => void
    create?: (options?: MutationFunctionOptions<AddEventState> | undefined) => Promise<any>
}

export type StepContentTypes = {
    tabName: tabNameProps | undefined
    options?: Options | null
    formState: any
    setFormState: React.SetStateAction<any> 
    activeStep: number
    steps: Array<string>
    handleNext: () => void
    handleBack:  () => void
}

export type CustomUploadProps = {
    title?: string
}