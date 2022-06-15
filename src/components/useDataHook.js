import { useEffect, useState } from "react";

export default function useDataHook(element, updateElement) {
    const [data, setData] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {
        updateElement(element).then((data) => {
            if (data == null) setError(true)
            else setData(data)
        })
    }, [element, updateElement])
    return {data, error}
}