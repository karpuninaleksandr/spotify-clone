import ErrorMessage from "./ErrorMessage"

export default function RowOfPlaylists(props) {
    if (props.error || !props.data) return <ErrorMessage />
    return <>
        {
            props.data.map(playlist => playlist ?
                    <button className={"album"} key={playlist.id} onClick={
                        () => props.updateData(playlist.id)
                    }>
                        <img src={playlist.images[0].url} alt={"album"} width="100" height="100" />
                        <p>{playlist.name}</p>
                    </button>
                : null
            )
        }
    </>
}