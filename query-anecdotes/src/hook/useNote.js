import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import noteService from '../services/note'

//I used Note instead of ancedote in the last project I find very diffcult to spell and hook name are longer
//that's why I use note
export const useNote = () => {
    const queryClient=useQueryClient()
    const query = useQuery({
        queryKey: ['notes'],
        queryFn: noteService.getAll,
        refetchOnWindowFocus: false,

    })

    const createMutation = useMutation({
        mutationFn: noteService.createNote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['notes'])
            queryClient.setQueryData(['notes'], anecdotes.concat(newAnecdote))
        },
    })

    const updateMutation = useMutation({
        mutationFn: noteService.vote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
    })

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        createAnecdote: (content) => createMutation.mutate({ content, votes: 0 }),
        voteAnecdote: (anecdote) => updateMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1
        }),
      
    }


}