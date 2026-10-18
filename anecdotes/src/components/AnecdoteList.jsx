
import { useEffect } from 'react'
import { useDeleteNote, useFilteredAnecdotes, useIninitialize, useSetAnecdote, useVoteAction } from '../store'

const AnecdoteList = () => {
    const anecdotes = useFilteredAnecdotes()
    const deleteNote = useDeleteNote()
    const vote = useVoteAction()
    const initialize = useIninitialize()
    const sortedAnecdotes = (anecdotes || []).toSorted((a, b) => b.votes - a.votes)

    useEffect(() => {
        async function fetchData() {
            await initialize()
        }
        fetchData()
    }, [initialize])
    return (
     <div>
    {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            <div>
               {anecdote.votes ===0 ? ( <button onClick={() => deleteNote(anecdote.id)}>delete</button>):null}
            </div>
        </div>
    ))}
</div>
    )
}

export default AnecdoteList