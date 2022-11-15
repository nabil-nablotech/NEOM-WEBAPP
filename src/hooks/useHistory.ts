import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useHistory = () => {

    const [historyStack, setHistoryStack] = useState<Array<string> | []>([])

    const navigate = useNavigate()

    const pushToStack = (stack: string) => {
        setHistoryStack(state => [...state, stack])

    }

    const popFromStack = () => {
        setHistoryStack(state => {
            let newState = [...state]

            if(newState.length > 0) {
                const lastEntry: string | undefined = newState.shift()
                
                if(lastEntry) { 
                    navigate(lastEntry, { replace: true })
                }
            }

            return newState
        })
    }

    return {
        stack: historyStack,
        pushToStack: pushToStack,
        popFromStack: popFromStack,
    }
}