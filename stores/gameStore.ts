import { create } from 'zustand'

import { dialogMapping } from '@/scenes/Office/data/content'
import { DialogPayload } from '@/scenes/Office/types'

interface GameStore {
  currentDialog: DialogPayload | null
  clearCurrentDialog: () => void
  setCurrentDialog: (dialogId: string) => void
  previousDialogIds: Map<string, boolean>

  isShowingInstructions: boolean
  setIsShowingInstructions: (isShowingInstructions: boolean) => void

  isAttemptingtoExit: boolean
  setIsAttemptingtoExit: (isAttemptingtoExit: boolean) => void

  isEnding: boolean
  setIsEnding: (isEnding: boolean) => void

  hasLoaded: boolean
  setHasLoaded: (hasLoaded: boolean) => void

  hasOnboarded: boolean
  setHasOnboarded: (hasOnboarded: boolean) => void

  numberOfRetries: number
  incrementNumberOfRetries: () => void

  currentTabIndex: number
  addOrSubCurrentIndexBy: (incOrDec: number) => void
  resetCurrentTabIndex: () => void

  resetGameState: () => void
}

const useGameStore = create<GameStore>((set) => ({
  currentDialog: null,
  previousDialogIds: new Map(),
  clearCurrentDialog: () =>
    set(() => {
      return { currentDialog: null }
    }),
  setCurrentDialog: (dialogId: string) =>
    set((state) => {
      const updatedDialogs = new Map(state.previousDialogIds)
      updatedDialogs.set(dialogId, true)
      return { currentDialog: dialogMapping[dialogId], previousDialogIds: updatedDialogs }
    }),

  isShowingInstructions: false,
  setIsShowingInstructions: (isShowingInstructions: boolean) =>
    set(() => ({ isShowingInstructions })),

  isAttemptingtoExit: false,
  setIsAttemptingtoExit: (isAttemptingtoExit: boolean) => set(() => ({ isAttemptingtoExit })),

  isEnding: false,
  setIsEnding: (isEnding: boolean) => set(() => ({ isEnding })),

  hasLoaded: false,
  setHasLoaded: (hasLoaded: boolean) => set(() => ({ hasLoaded })),

  hasOnboarded: false,
  setHasOnboarded: (hasOnboarded: boolean) => set(() => ({ hasOnboarded })),

  numberOfRetries: 0,
  incrementNumberOfRetries: () => {
    set((state) => {
      return { numberOfRetries: state.numberOfRetries + 1 }
    })
  },

  currentTabIndex: 0,
  addOrSubCurrentIndexBy: (incOrDec: number) => {
    set((state) => {
      return { currentTabIndex: Math.abs(state.currentTabIndex + incOrDec) }
    })
  },
  resetCurrentTabIndex: () => set(() => ({ currentTabIndex: 0 })),

  resetGameState: () =>
    set(() => {
      return {
        currentDialog: null,
        currentTabIndex: 0,
        hasOnboarded: false,
        isAttemptingtoExit: false,
        isEnding: false,
        numberOfRetries: 0,
        previousDialogIds: new Map(),
      }
    }),
}))

export default useGameStore
