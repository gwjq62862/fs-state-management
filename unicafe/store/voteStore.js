

import { create } from 'zustand'

export const useVoteStore = create((set) => ({
    good: 0,
    neutral: 0,
    bad: 0,

    goodFn: () => set((state) => ({ good: state.good + 1 })),
    neutralFn: () => set((state) => ({ neutral: state.neutral + 1 })),
    badFn: () => set((state) => ({ bad: state.bad + 1 })),
}))