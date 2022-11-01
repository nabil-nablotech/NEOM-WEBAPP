import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables } from "@apollo/client"
import { MutateFunction } from "react-query"
import { AddEventState } from "../store/reducers/eventReducer"
import { Place } from "./Place"
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
    create?: (options?: any) => Promise<any>
    update?: (options?: any) => Promise<any>
    setSearchValue?: (str: string) => void
}

export type StepContentTypes = {
    tabName: tabNameProps | undefined
    options?: Options | null
    places?: Place[] | []
    formState: any
    setFormState: React.SetStateAction<any> 
    activeStep: number
    steps: Array<string>
    handleNext: (e: any, data?: InitialValues) => void
    handleChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    handleBack:  () => void
    formik?:any
}

export type CustomUploadProps = {
    title?: string
}

export type InitialValues = {
    place: string,
    eventDate: Date,
    recordingTeam: string,
    siteDescription: string,
    fieldNarrative: string,
    siteType: string,
    keywords: string,
}