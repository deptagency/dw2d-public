import { Dialog as HD } from '@headlessui/react'
import { useCallback, useEffect, useState } from 'react'

import css from './Modal.module.css'

import Emitter from '@/scenes/Office/core/EventEmitter'
import { DialogChoice, EVENTS } from '@/scenes/Office/types'
import useGameStore from '@/stores/gameStore'

export default function ModalDialog() {
  const [answer, setAnswer] = useState<DialogChoice | null>(null)

  const {
    currentDialog,
    clearCurrentDialog,
    currentTabIndex,
    addOrSubCurrentIndexBy,
    resetCurrentTabIndex,
  } = useGameStore()

  const handleResultContinue = () => {
    clearCurrentDialog()
    resetCurrentTabIndex()
    Emitter.emit(EVENTS.LIVE)
  }
  const handleResultRestart = () => {
    clearCurrentDialog()
    resetCurrentTabIndex()
    Emitter.emit(EVENTS.DIE)
  }

  const handleArrowPress = useCallback(
    (event: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'Tab'].includes(event.key)) return
      if (event.key === 'Tab') {
        addOrSubCurrentIndexBy(1)
        return
      }
      addOrSubCurrentIndexBy(event.key === 'ArrowUp' ? -1 : 1)
    },
    [currentTabIndex]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleArrowPress)
    return function cleanup() {
      document.removeEventListener('keydown', handleArrowPress)
    }
  }, [])

  useEffect(() => {
    if (answer) {
      document.getElementById(`button-dismiss`)?.focus()
    } else if (currentDialog) {
      document.getElementById(`button-${currentTabIndex % currentDialog.choices.length}`)?.focus()
    }
  }, [answer, currentTabIndex])

  if (!currentDialog) return null

  return (
    <HD
      open={true}
      onClose={() => {
        // Block keyboard ESC closing
      }}
      className={css.root}
    >
      <HD.Backdrop className={css.overlay} aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className={css.scrollWrapper}>
        {/* Container to center the panel */}
        <div className={css.modalContainer}>
          {/* The panel itself */}
          <HD.Panel className={css.modalPanel}>
            {answer ? (
              <>
                <HD.Title className={css.title}>{answer.followup.title}</HD.Title>
                <section className={css.body}>
                  <div dangerouslySetInnerHTML={{ __html: answer.followup.body }} />
                  <div className={css.actions}>
                    <button
                      id="button-dismiss"
                      onClick={
                        answer.result === EVENTS.LIVE ? handleResultContinue : handleResultRestart
                      }
                    >
                      {answer.followup.dismiss}
                    </button>
                  </div>
                </section>
              </>
            ) : (
              <>
                <HD.Title className={css.title}>{currentDialog.name}:</HD.Title>
                <section className={css.body}>
                  <div dangerouslySetInnerHTML={{ __html: currentDialog.prompt }} />
                  <div className={css.actions} id="actions">
                    {!answer &&
                      currentDialog.choices.map((choice, index) => {
                        return (
                          <button
                            dangerouslySetInnerHTML={{ __html: choice.response }}
                            id={`button-${index}`}
                            key={choice.response}
                            onClick={() => setAnswer(choice)}
                          />
                        )
                      })}
                  </div>
                </section>
              </>
            )}
          </HD.Panel>
        </div>
      </div>
    </HD>
  )
}
