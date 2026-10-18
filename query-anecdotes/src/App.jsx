import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNote } from './hook/useNote'

const App = () => {
  const {data:anecdotes,error,isLoading, voteAnecdote}=useNote()
  const handleVote = (anecdote) => {
     voteAnecdote(anecdote)
  }

  
  if(isLoading) return (
    <div>loading</div>
  )

  if (error) {
    return (
      <div>anecdote service not available due to problems in server</div>
    )
  }
 // console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App