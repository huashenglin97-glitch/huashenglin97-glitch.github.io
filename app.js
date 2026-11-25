(function () {
  const buttons = document.querySelectorAll('.lang-btn');
  const translatable = document.querySelectorAll('[data-en][data-zh]');

  function applyLanguage(lang) {
    const safeLang = lang === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = safeLang === 'zh' ? 'zh-CN' : 'en';

    translatable.forEach((el) => {
      const value = el.getAttribute('data-' + safeLang);
      if (value !== null) {
        el.textContent = value;
      }
    });

    buttons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === safeLang);
    });

    try {
      localStorage.setItem('site_lang', safeLang);
    } catch (_) {
      // Ignore storage errors in restricted environments
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });

  let saved = 'en';
  try {
    saved = localStorage.getItem('site_lang') || 'en';
  } catch (_) {
    saved = 'en';
  }
  applyLanguage(saved);
})();
