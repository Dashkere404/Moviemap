// src/components/FilterModal.jsx

import { useEffect } from 'react';
import { logEvent } from '../logger'; // ✅ Подключаем наш логгер
import styles from './FilterModal.module.css';

export default function FilterModal({ isOpen, onClose, title, children, onApply, onReset }) {
  const modalRef = useRef(null);

  // Логируем открытие и закрытие модалки
  useEffect(() => {
    if (isOpen) {
      logEvent('modal_opened', { modalTitle: title }); // ✅ Открытие модалки
      document.body.style.overflow = 'hidden';
    } else {
      logEvent('modal_closed', { modalTitle: title }); // ✅ Закрытие модалки
      document.body.style.overflow = 'auto';
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        logEvent('modal_closed_by_click_outside', { modalTitle: title }); // ✅ Закрыто кликом вне окна
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, title]);

  // Логируем нажатие на кнопку "Сбросить"
  const handleReset = () => {
    logEvent('filter_reset', { modalTitle: title });
    onReset();
  };

  // Логируем нажатие на кнопку "Применить"
  const handleApply = () => {
    logEvent('filter_applied', { modalTitle: title });
    onApply();
  };

  // Логируем закрытие модалки кнопкой ×
  const handleClose = () => {
    logEvent('modal_closed_by_button', { modalTitle: title });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalContent}>
          {children}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.resetButton} onClick={handleReset}>
            Сбросить
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            Применить
          </button>
        </div>
      </div>
    </div>
  );
}