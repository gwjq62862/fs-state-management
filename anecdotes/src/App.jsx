
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {



  return (
  <div>
      <div >
        <h1 >
          Anecdotes App 
        </h1>
        
        <Notification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </div>
  )
}

export default App
