import { useState } from 'react'
import { useCreateAnecdotesAction } from '../store'

const AnecdoteForm = () => {
    const create = useCreateAnecdotesAction()
    const [content, setContent] = useState('')
    const addAnecdote = (event) => {
        event.preventDefault()
        if (content.trim() === '') return

        create(content)
        setContent('')
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input data-testid="new" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm