import { useEffect, useState } from "react";

export default function useDataHook(elementType, elementId, updateElement) {
    const [data, setData] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {

        if (elementId) {
            const stopFetch = new AbortController()
            stopFetch.abort()

            updateElement(elementId).then((data) => {
                if (data == null) setError(true)
                else {
                    setData(data)
                    setError(false)
                }
            }) 
        }
    }, [elementId, updateElement])
    switch (elementType) {
        case "genres":
            const [dataGenres, errorGenres] = [data, error]
            return [dataGenres, errorGenres]
        case "playlists":
            const [dataPlaylists, errorPlaylists] = [data, error]
            return [dataPlaylists, errorPlaylists]
        case "tracks":
            const [dataTracks, errorTracks] = [data, error]
            return [dataTracks, errorTracks]       
        default: return [data, error]     
    }
}