import { useFilterAction } from "../store"

const Filter = () => {
    const setFilter = useFilterAction()

    const handleChange = (event) => {
        const val = event.target.value
        setFilter(val)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} data-testid="filter" />
        </div>
    )
}

export default Filter