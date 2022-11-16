import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { RootState } from "../store"
import { setHistoryRedux } from "../store/reducers/searchResultsReducer"
import { tabNameProps } from "../types/SearchResultsTabsProps"

export const useHistory = () => {

    const [historyStack, setHistoryStack] = useState<Array<string> | []>([])
    const { history } = useSelector((state: RootState) => state.searchResults);
    let { tabName } = useParams<{ tabName?: tabNameProps }>();

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
            } else {
                if (tabName) navigate(`/search-results/${tabName}`, { replace: true })
            }
        } else {
            if (tabName) navigate(`/search-results/${tabName}`, { replace: true })
        }
        dispatch(setHistoryRedux(newState))

    }

    return {
        stack: historyStack,
        navigateTo: navigateTo,
        goBack: goBack,
    }
}