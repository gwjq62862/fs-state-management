import { useState } from 'react'
import { useCreateAnecdotesAction } from '../store'

const AnecdoteForm = () => {
    const create = useCreateAnecdotesAction()
    const [content, setContent] = useState('')
    const addAnecdote = async (event) => {
        event.preventDefault()
        if (content.trim() === '') return
        try {

            create(content)
            setContent('')

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input data-testid="new"  name="anecdote" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm