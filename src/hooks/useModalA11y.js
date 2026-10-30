import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * useModalA11y
 * Handles the accessibility plumbing every popup/modal in the app needs:
 * - locks body scroll while open
 * - closes on Escape
 * - traps Tab focus inside the modal
 * - focuses the first focusable element on open
 * - restores focus to the trigger element on close
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @returns {React.RefObject} ref to attach to the modal's root dialog element
 */
export const useModalA11y = (isOpen, onClose) => {
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    previouslyFocused.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const focusFirstElement = () => {
      const focusables = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR)
      if (focusables && focusables.length) {
        focusables[0].focus()
      } else {
        dialogRef.current?.focus()
      }
    }
    // small delay so the element exists after the enter animation mounts
    const focusTimer = setTimeout(focusFirstElement, 50)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null)

        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen, onClose])

  return dialogRef
}
