document.addEventListener('DOMContentLoaded', () => {

  const savedLang = localStorage.getItem('preferredLang');

  // ---------------------------------
  // Если пользователь уже выбрал язык
  // ---------------------------------

  if (savedLang === 'ru') {

    if (!window.location.pathname.startsWith('/ru')) {
      window.location.href = '/ru/';
      return;
    }

    return;
  }

  if (savedLang === 'en') {

    if (window.location.pathname.startsWith('/ru')) {
      window.location.href = '/';
      return;
    }

    return;
  }

  // ---------------------------------
  // Первый визит — определяем язык браузера
  // ---------------------------------

  const lang = navigator.language.toLowerCase();

  const ruLangs = [
    'ru',
    'uk',
    'be',
    'kk',
    'ky'
  ];

  const isRu = ruLangs.some(code => lang.startsWith(code));

  if (isRu && window.location.pathname === '/') {
    window.location.href = '/ru/';
  }

});


// ---------------------------------
// Сохранение ручного выбора языка
// ---------------------------------

document.addEventListener('DOMContentLoaded', () => {

  const langLinks = document.querySelectorAll('.langswitch a');

  langLinks.forEach(link => {

    link.addEventListener('click', () => {

      const href = link.getAttribute('href');

      if (href.includes('/ru')) {
        localStorage.setItem('preferredLang', 'ru');
      } else {
        localStorage.setItem('preferredLang', 'en');
      }

    });

  });

});