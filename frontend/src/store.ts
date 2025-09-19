import { create } from 'zustand'

interface AppState {
  userRole: 'Media Team' | 'Strategy Head' | null
  setUserRole: (role: 'Media Team' | 'Strategy Head' | null) => void
  signoffs: {
    'Media Team': boolean
    'Strategy Head': boolean
  }
  updateSignoff: (role: 'Media Team' | 'Strategy Head', value: boolean) => void
  reset: () => void
}

export const useStore = create<AppState>((set) => ({
  userRole: null,
  setUserRole: (role) => set({ userRole: role }),
  signoffs: {
    'Media Team': false,
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
      'Media Team': false,
      'Strategy Head': false
    }
  })
}))