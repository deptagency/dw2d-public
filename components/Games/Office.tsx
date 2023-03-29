import ModalDialog from '@/components/Modal/ModalDialog'
import ModalGeneric from '@/components/Modal/ModalGeneric'
import usePhaserGame from '@/hooks/usePhaserGame'
import config from '@/scenes/Office/config'
import Emitter from '@/scenes/Office/core/EventEmitter'
import {
  instructionContent,
  offboardingContent,
  onboardingContent,
} from '@/scenes/Office/data/content'
import GameScene from '@/scenes/Office/GameScene'
import IntroScene from '@/scenes/Office/IntroScene'
import OutroScene from '@/scenes/Office/OutroScene'
import PreloadScene from '@/scenes/Office/PreloadScene'
import { EVENTS } from '@/scenes/Office/types'
import useGameStore from '@/stores/gameStore'

export default function Game() {
  const {
    currentDialog,
    hasLoaded,
    isShowingInstructions,
    setIsShowingInstructions,
    hasOnboarded,
    setHasOnboarded,
    isAttemptingtoExit,
    setIsAttemptingtoExit,
    resetCurrentTabIndex,
    isEnding,
    setIsEnding,
  } = useGameStore()

  usePhaserGame({
    ...config,
    scene: [PreloadScene, IntroScene, GameScene, OutroScene],
  })

  const handleCompleteOnboarding = () => {
    resetCurrentTabIndex()
    setHasOnboarded(true)
    Emitter.emit(EVENTS.START)
  }
  const handleCompleteOffboarding = () => {
    resetCurrentTabIndex()
    setIsAttemptingtoExit(false)
    setIsEnding(true)
    Emitter.emit(EVENTS.END)
  }
  const handleStayLonger = () => {
    setIsAttemptingtoExit(false)
    Emitter.emit(EVENTS.RESUME)
  }

  const isOnboarding = hasLoaded && !hasOnboarded
  const isOffboaridng = hasLoaded && isAttemptingtoExit && !isEnding
  const canShowInstructions = !isOnboarding && !isOffboaridng && !currentDialog

  return (
    <main>
      {canShowInstructions && isShowingInstructions && (
        <ModalGeneric
          title={instructionContent.title}
          body={instructionContent.body}
          actions={
            <button
              onClick={() => {
                setIsShowingInstructions(false)
              }}
            >
              {instructionContent.dismiss}
            </button>
          }
        />
      )}
      {isOnboarding && (
        <ModalGeneric
          title={onboardingContent.title}
          body={onboardingContent.body}
          actions={<button onClick={handleCompleteOnboarding}>{onboardingContent.dismiss}</button>}
        />
      )}
      {isOffboaridng && (
        <ModalGeneric
          title={offboardingContent.title}
          body={offboardingContent.body}
          actions={
            <>
              <button id="button-0" onClick={handleStayLonger}>
                {offboardingContent.dismiss}
              </button>
              <button id="button-1" onClick={handleCompleteOffboarding}>
                {offboardingContent.confirm}
              </button>
            </>
          }
        />
      )}
      {currentDialog && <ModalDialog />}
      <div id="game-content" />
    </main>
  )
}
