import { useNote } from "../hook/useNote"
import { useNoti } from "../hook/useNoti"

const AnecdoteForm = () => {
  const { createAnecdote } = useNote()
  const { setNotificationMessage } = useNoti()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value


    createAnecdote(content, {
      onSuccess: () => {
        setNotificationMessage(`you created '${content}'`)
        event.target.reset()
      },
      onError: (error) => {
        setNotificationMessage(error.message)
        console.log("Error happened:", error)
      }
    })
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