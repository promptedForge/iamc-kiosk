import { create } from 'zustand'

interface AppState {
  userRole: 'Analyst' | 'Strategy Head' | null
  setUserRole: (role: 'Analyst' | 'Strategy Head' | null) => void
  signoffs: {
    Analyst: boolean
    'Strategy Head': boolean
  }
  updateSignoff: (role: 'Analyst' | 'Strategy Head', value: boolean) => void
  reset: () => void
}

export const useStore = create<AppState>((set) => ({
  userRole: null,
  setUserRole: (role) => set({ userRole: role }),
  signoffs: {
    Analyst: false,
    'Strategy Head': false
  },
  updateSignoff: (role, value) => set((state) => ({
    signoffs: {
      ...state.signoffs,
      [role]: value
    }
  })),
  reset: () => set({
    userRole: null,
    signoffs: {
      Analyst: false,
      'Strategy Head': false
    }
  })
}))