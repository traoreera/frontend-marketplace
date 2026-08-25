import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

/** Centered popup with a dismissible backdrop — Escape key, backdrop click,
 * or the × button all close it via the same `onClose`. No portal: relies on
 * `.modal-backdrop`'s fixed positioning + high z-index to sit above
 * whatever page it's rendered from, same trick as .toast-container. */
export default function Modal({
  title,
  onClose,
  children,
}: {
  title: ReactNode
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-panel__header">
          <span className="modal-panel__title">{title}</span>
          <button className="btn btn-ghost btn-sm btn-icon" onClick={onClose} aria-label="Fermer">
            <X size={16} />
          </button>
        </div>
        <div className="modal-panel__body">{children}</div>
      </div>
    </div>
  )
}
