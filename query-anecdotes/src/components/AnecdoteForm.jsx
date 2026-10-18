import { useNote } from "../hook/useNote"

const AnecdoteForm = () => {
  const { createAnecdote}=useNote()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
     createAnecdote(content)
    event.target.reset()
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm