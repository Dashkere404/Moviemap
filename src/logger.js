// src/logger.js

export const logEvent = (type, payload = {}) => {
    const event = {
      type,
      timestamp: new Date().toISOString(),
      data: payload,
      url: window.location.href,
      userAgent: navigator.userAgent
    };
  
    // Выводим в консоль для отладки
    console.log(`[Logger] ${type}`, event);
  
    // Когда появится бэкенд, можно отправлять логи
    // fetch('https://api.moviemap.app/log ', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // }).catch(err => {
    //   console.error('[Logger Error]', err);
    // });
  };