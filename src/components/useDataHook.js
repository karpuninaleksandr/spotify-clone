import { useEffect, useState } from "react";

export default function useDataHook(elementId, fetchToInvoke) {
    const [data, setData] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {
        if (elementId) {
            let stopFetch = new AbortController()
            const signal = stopFetch.signal
            stopFetch.abort()

            fetchToInvoke(elementId, signal).then((data) => {
                if (data == null) setError(true)
                else {
                    setData(data)
                    setError(false)
                }
            }).catch(() => {
                if (stopFetch.signal.aborted) return
                setError(true)
            }) 
            return () => {
                stopFetch.abort()
            }
        }
    }, [elementId, fetchToInvoke])
    return [data, error]
}