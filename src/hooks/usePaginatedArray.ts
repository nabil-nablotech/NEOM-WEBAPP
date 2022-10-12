
import { useState } from 'react';
import { useEffect } from 'react';
import { PaginatedHookType } from '../types/UsePaginatedArray';

export const usePaginatedArray = ({
    apiUrl,
    step
}: PaginatedHookType) => {
    const [data, setData] = useState<any>([])
    const paginationStep = step
    const [paginationIndex, setPaginationIndex] = useState<number>(paginationStep)
    const [responseData, setResponseData] = useState<any>([])
    const [hasMoreData, setHasMoreData] = useState<boolean>(true)

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                // setResponseData(res)
                setResponseData(res.slice(0,50)) //for testing
                setData(res.slice(0, paginationIndex))
            })

    }, [])

    

    const fetchData = () => {
        const newpaginationIndex = paginationIndex + paginationStep
        
        /** hardcode max limit */
        if(newpaginationIndex < responseData.length + step) {
            setData([...data, ...responseData.slice(paginationIndex, newpaginationIndex)])
            setPaginationIndex(newpaginationIndex)
            setHasMoreData(true)
        } else {
            setHasMoreData(false)
        }
    }

    return {
        data,
        setData,
        paginationIndex,
        setPaginationIndex,
        responseData,
        setResponseData,
        hasMoreData,
        setHasMoreData,
        fetchData
    }
}