import { useEffect } from 'react';
import styles from './FilterModal.module.css';
import { logEvent } from '../logger'; // ✅ Импортируем логгер

export default function FilterModal({ isOpen, onClose, title, children, onApply, onReset }) {
  const modalRef = useRef(null);

  // Логируем открытие/закрытие модалки
  useEffect(() => {
    if (isOpen) {
      logEvent('modal_opened', { modalTitle: title }); // 🔹 Открытие модалки
      document.body.style.overflow = 'hidden';
    } else {
      logEvent('modal_closed', { modalTitle: title }); // 🔹 Закрытие модалки
      document.body.style.overflow = 'auto';
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        logEvent('modal_closed_by_click_outside', { modalTitle: title }); // 🔹 Клик вне модалки
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, title]);

  // Логируем нажатие на кнопку "Сбросить"
  const handleReset = () => {
    logEvent('filter_reset', { modalTitle: title }); // 🔹 Сброс фильтров
    onReset();
  };

  // Логируем нажатие на кнопку "Применить"
  const handleApply = () => {
    logEvent('filter_applied', { modalTitle: title }); // 🔹 Применение фильтра
    onApply();
  };

  // Логируем закрытие модалки через крестик
  const handleClose = () => {
    logEvent('modal_closed_by_button', { modalTitle: title }); // 🔹 Закрытие кнопкой ×
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