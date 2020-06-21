if ('serviceWorker' in navigator && !navigator.userAgent.includes('Edge')) {
  const enum Conf {
    WAIT_TIME = 3000  // Give the page a few seconds to load
  }

  setTimeout(() => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_PATH}service-worker.js`)
      .then(reg => {
        console.debug('Service worker registered', reg.active ? '(active)' : '(inactive)');
      })
      .catch(e => {
        console.error('Service worker registration failed', e);
      });
  }, Conf.WAIT_TIME);
}
