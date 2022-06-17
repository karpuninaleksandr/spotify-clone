import ErrorMessage from "./ErrorMessage"

export default function RowOfTracks(props) {
    if (props.error || !props.data) return <ErrorMessage />
    return <>
        {
            props.data.map(track => track ?
                    <button className={"track"} key={track.track.id} onClick={
                        () => props.updateData(track.track.id)
                    }>
                        <img src={track.track.album.images[0].url} alt={"track"} width="100" height="100" />
                        <p>{track.track.name}</p>
                        <p>{track.track.artists[0].name}</p>
                    </button>
                : null    
            )
        }
    </>
}