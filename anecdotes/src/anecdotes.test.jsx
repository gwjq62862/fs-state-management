
import { expect, test, beforeEach, describe, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('./services/ancdote', () => ({
    default: {
        getAll: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        deleteNote: vi.fn(),
    }
}))


import ancdoteService from './services/ancdote'
import { useAnecdoteStore } from './store';
import { act, renderHook } from '@testing-library/react';
import AnecdoteList from './components/AnecdoteList';
import userEvent from '@testing-library/user-event';
import Filter from './components/Filter';
describe('anecdote testing', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        useAnecdoteStore.setState({
            anecdotes: [],
            filter: 'all',
            noti: ''
        })
    })
    test('a test that verifies the state is initialized with the anecdotes returned by the backend', async () => {
        const testAnecdotes = [
            {
                "content": "If it hurts, do it more often",
                "id": "47145",
                "votes": 6
            },
            {
                "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
                "id": "36975",
                "votes": 3
            },
        ]
        ancdoteService.getAll.mockResolvedValue(testAnecdotes)
        const { result } = renderHook(() => useAnecdoteStore());

        await act(async () => {
            await result.current.actions.ininitialize()

        })


        expect(result.current.anecdotes).toEqual(testAnecdotes)
    }),
        test('a test that verifies the component displaying anecdotes receives the anecdotes from the store sorted by votes.', async () => {
            const unsortedAnecdotes = [
                { id: '1', content: 'Anecdote with low votes', votes: 2 },
                { id: '2', content: 'Anecdote with highest votes', votes: 10 },
                { id: '3', content: 'Anecdote with medium votes', votes: 5 },
            ]


            ancdoteService.getAll.mockResolvedValue(unsortedAnecdotes)
            render(<AnecdoteList />)
            //since we use useEffect this one wiat for that one 
            await waitFor(() => {
                expect(screen.getByText('Anecdote with highest votes')).toBeDefined()
            })
            //then we call with this regex that match this text  and this one return array
            const anecdoteDivs = screen.getAllByText(/Anecdote with/)
            //this track the sort order 
            expect(anecdoteDivs[0].textContent).toContain('Anecdote with highest votes')
            expect(anecdoteDivs[1].textContent).toContain('Anecdote with medium votes')
            expect(anecdoteDivs[2].textContent).toContain('Anecdote with low votes')
        }),
        test('a test that verifies the correct React component receives a properly filtered list of anecdotes.', async () => {
            const testAnecdotes = [
                { id: '1', content: 'Learning React is fun', votes: 2 },
                { id: '2', content: 'Writing backend code in Node.js', votes: 5 },
            ]

            ancdoteService.getAll.mockResolvedValue(testAnecdotes)

            render(
                <div>
                    <Filter />
                    <AnecdoteList />
                </div>
            )
            await waitFor(async () => {
                expect(screen.getByText('Learning React is fun')).toBeDefined()
            })

            const filterInput = screen.getByTestId('filter')
            await userEvent.type(filterInput, 'Node')

            expect(screen.queryByText('Learning React is fun')).toBeNull()
        }),
        test('a test that verifies that voting increases the number of votes for an anecdote.', async () => {
            const testAnecdotes = [
                { id: '1', content: 'Learning React is fun', votes: 2 },
                { id: '2', content: 'Writing backend code in Node.js', votes: 0 },
            ]
            ancdoteService.getAll.mockResolvedValue(testAnecdotes)
            ancdoteService.update.mockResolvedValue({
                id: '1',
                content: 'Learning React is fun',
                votes: 3
            })
            render(
                <AnecdoteList />
            )
            await waitFor(async () => {
                expect(screen.getByText('Learning React is fun')).toBeDefined()
            })
            const specificButton = screen.getByTestId(`vote-btn-${testAnecdotes[0].id}`)

            await userEvent.click(specificButton)

            await waitFor(() => {
                expect(screen.getByText('has 3')).toBeDefined()
            })


        })

})
