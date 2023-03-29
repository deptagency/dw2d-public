import { Dialog as HD } from '@headlessui/react'
import { ReactNode, useCallback, useEffect } from 'react'

import css from './Modal.module.css'

import useGameStore from '@/stores/gameStore'

interface ModalGenericProps {
  actions?: ReactNode
  body?: string
  title?: string | ReactNode
}

export default function ModalGeneric({ actions, body, title }: ModalGenericProps) {
  const { currentTabIndex, addOrSubCurrentIndexBy } = useGameStore()

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

  // For now, assumes no more than two options for a generic modal...
  const elementToFocus = document.getElementById(`button-${currentTabIndex % 2}`)
  if (elementToFocus) {
    elementToFocus.focus()
  }

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
            <>
              {title && <HD.Title className={css.title}>{title}</HD.Title>}
              <section className={css.body}>
                {body && <div dangerouslySetInnerHTML={{ __html: body }} />}
                {actions && <div className={css.actions}>{actions}</div>}
              </section>
            </>
          </HD.Panel>
        </div>
      </div>
    </HD>
  )
}
