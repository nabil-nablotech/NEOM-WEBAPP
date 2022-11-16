import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { RootState } from "../store"
import { setHistoryRedux } from "../store/reducers/searchResultsReducer"

export const useHistory = () => {

    const [historyStack, setHistoryStack] = useState<Array<string> | []>([])
    const { history } = useSelector((state: RootState) => state.searchResults);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const setHistory = (stack: string) => {

        /** set current path as history */
        dispatch(setHistoryRedux([...history, pathname]))

        /** navigate to expected path */
        navigate(stack, { replace: true })
    }

    const goBack = () => {

        let newState = [...history]

        if (newState.length > 0) {
            const lastEntry: string | undefined = newState.pop()

            if (lastEntry) {
                navigate(lastEntry, { replace: true })
            }
        }
        dispatch(setHistoryRedux(newState))

    }

    return {
        stack: historyStack,
        setHistory: setHistory,
        goBack: goBack,
    }
}