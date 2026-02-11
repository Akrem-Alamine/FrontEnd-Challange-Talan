import React, { ReactNode, useEffect } from 'react';
import styles from './Modal.module.css';

/**
 * Modal component props
 */
interface ModalProps {
  /** Modal visibility */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal content */
  children: ReactNode;
  /** Modal title */
  title?: string;
  /** Show close button */
  showCloseButton?: boolean;
}

/**
 * Modal Component
 * Accessible modal dialog with backdrop
 */
export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title,
  showCloseButton = true 
}: ModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {(title || showCloseButton) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
