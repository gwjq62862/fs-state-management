
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error(`GET ${baseUrl} failed: ${response.status}`)
  }
  return response.json()
}

const create = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  if (!response.ok) throw new Error(`POST ${baseUrl} failed: ${response.status}`)
  return response.json()
}

const update = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  })
  if (!response.ok) throw new Error(`PUT ${baseUrl}/${anecdote.id} failed: ${response.status}`)
  return response.json()
}
const deleteNote = async (id) => {
  const url= `http://localhost:3001/anecdotes/${id}`

  const response = await fetch(url, {
    method: "DELETE",
    
  })
  if (!response.ok) {
    throw new Error(`DELETE ${baseUrl} failed: ${response.status}`)
  }
  return response.json()
}



export default { getAll, create, update,deleteNote }