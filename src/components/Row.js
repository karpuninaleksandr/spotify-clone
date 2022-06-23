import ErrorMessage from "./ErrorMessage"
import API from "../utils/api"
import useDataHook from "./useDataHook"
import RowElement from "./RowElement"

export default function Row(props) {
    let fetchToInvoke = null
    switch(props.type) {
        case "genre":
            fetchToInvoke = API.get_genres
            break
        case "album": 
            fetchToInvoke = API.get_playlists
            break
        case "track":   
            fetchToInvoke = API.get_tracks
            break
    }
    const [data, error] = useDataHook(props.elemId, fetchToInvoke)
    if (error || !data) return <ErrorMessage />
    switch (props.type) {
        case "genre":
            return <>
                {
                    data.map(genre => genre ? 
                            <RowElement 
                                type={props.type} 
                                key={genre.id} 
                                id={genre.id}
                                updateData={props.updateData} 
                                img={genre.icons[0].url}
                                name={genre.name}
                                artist={null}
                            /> 
                        : null
                    )
                }
            </>
        case "album":
            return <>
                {
                    data.map(playlist => playlist ? 
                            <RowElement 
                                type={props.type} 
                                key={playlist.id} 
                                id={playlist.id}
                                updateData={props.updateData} 
                                img={playlist.images[0].url}
                                name={playlist.name}
                                artist={null}
                            /> 
                        : null
                    )
                }
            </>
        case "track":
            return <>
                {
                    data.map(track => track ? 
                            <RowElement 
                                type={props.type} 
                                key={track.track.id} 
                                id={track.track.id}
                                updateData={props.updateData} 
                                img={track.track.album.images[0].url}
                                name={track.track.name}
                                artist={track.track.artists[0].name}
                            /> 
                        : null
                    )
                }
            </>        
    }
}