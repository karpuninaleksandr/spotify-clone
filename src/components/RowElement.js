export default function RowElement(props) {
    return <button className={props.type} onClick={
        () => props.updateData(props.id)
    }>
        <img src={props.img} alt={props.type} width="100" height="100" />
        <p>{props.name}</p>
        <p>{props.artist}</p>
    </button>
}