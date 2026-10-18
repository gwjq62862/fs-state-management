
import { create } from 'zustand'


import ancdoteService from '../src/services/ancdote'
const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: 'all',
  noti: '',
  actions: {
    createAnecdote: async (content) => {
      const created = await ancdoteService.create(content)
      set(state => ({
        anecdotes: [...state.anecdotes, created]
      }))
      get().actions.setNoti('you have created anecdote successfully')
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      set(state => ({ anecdotes: state.anecdotes.map(a => a.id === id ? updated : a) }))
      get().actions.setNoti(`you voted '${anecdote.content}'`)
      await ancdoteService.update(updated)

    },
    ininitialize: async () => {

      const data = await ancdoteService.getAll()


      set({ anecdotes: data })

    },

    setFilter: (value) => set({ filter: value }),
    setAnecdote: (value) => set({ anecdotes: value }),
    setNoti: (value) => set({ noti: value }),
    deleteNote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      if (anecdote.votes > 0) {
        alert("you can't delete the note that has vote")
        return
      }



      set((state) => ({ anecdotes: state.anecdotes.filter(a => a.id !== id) }))
      get().actions.setNoti("you have deleted sucessfully")
      await ancdoteService.deleteNote(id)

    }
  },

}))

//set can acess prev value of things
//so new data is not from prev value so it gotta come form outsdie
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useFilterAction = () => useAnecdoteStore((state) => state.actions.setFilter)
export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useVoteAction = () => useAnecdoteStore((state) => state.actions.vote)
export const useCreateAnecdotesAction = () => useAnecdoteStore((state) => state.actions.createAnecdote)
export const useSetAnecdote = () => useAnecdoteStore((state) => state.actions.setAnecdote)
export const useIninitialize = () => useAnecdoteStore((state) => state.actions.ininitialize)
export const useNoti = () => useAnecdoteStore((state) => state.noti)
export const useNotiAction = () => useAnecdoteStore((state) => state.actions.setNoti)
export const useDeleteNote = () => useAnecdoteStore((state) => state.actions.deleteNote)
export const useFilteredAnecdotes = () => {
  const anecdote = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  if (filter !== '' && filter !== 'all') return anecdote.filter((value) => {
    return value.content.toLowerCase().includes(filter.toLowerCase())
  })


  return anecdote
}

