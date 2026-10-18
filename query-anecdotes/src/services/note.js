const baseUrl = 'http://localhost:3001/anecdotes'
async function getAll() {
    const res = await fetch(baseUrl)
    if (!res.ok) {
        throw new Error("error in fetching data")
    }
    return res.json()
}

async function vote(data) {
    const res = await fetch(`${baseUrl}/${data.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error('error in updating data')
  return   res.json()
}

async function createNote(data) {
    const res = await fetch(baseUrl, {
        method: "POST",
       body: JSON.stringify(data)
    })
    return res.json()
}

export default { getAll, vote, createNote }