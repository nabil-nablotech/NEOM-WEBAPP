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

    const navigateTo = (stack: string | { search: string, pathname: string }) => {

        /** set current path as history */
        dispatch(setHistoryRedux([...history, pathname]))

        /** navigate to expected path */
        if (typeof stack === 'string') {
            navigate(stack, { replace: true })
        }
        if (
            (typeof stack === 'object') &&
            stack.search &&
            stack.pathname
        ) {
            navigate(stack);
        }
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
        navigateTo: navigateTo,
        goBack: goBack,
    }
}