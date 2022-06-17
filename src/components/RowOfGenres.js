import ErrorMessage from "./ErrorMessage"

export default function RowOfGenres(props) {
    if (props.error || !props.data) return <ErrorMessage />
    return <>
        {
            props.data.map(genre => genre ?
                    <button className={"genre"} key={genre.id} onClick={
                        () => props.updateData(genre.id)
                    }>
                        <img src={genre.icons[0].url} alt={"genre"} width="100" height="100" />
                        <p>{genre.name}</p>
                    </button>
                : null    
            )
        }
    </>
}