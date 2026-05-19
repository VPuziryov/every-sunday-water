document.addEventListener('DOMContentLoaded', () => {

  // Проверяем сохранённый язык
  const savedLang = localStorage.getItem('preferredLang');

  // Если пользователь уже выбрал язык вручную —
  // ничего не редиректим
  if (savedLang) {
    return;
  }

  // Если уже открыта RU версия —
  // ничего не делаем
  if (window.location.pathname.startsWith('/ru')) {
    return;
  }

  // Язык браузера
  const lang = navigator.language.toLowerCase();

  // Русскоязычные / СНГ языки
  const ruLangs = [
    'ru',
    'uk',
    'be',
    'kk',
    'ky'
  ];

  // Проверяем язык
  const isRu = ruLangs.some(code => lang.startsWith(code));

  // Если русский язык браузера —
  // отправляем в /ru/
  if (isRu && window.location.pathname === '/') {
    window.location.href = '/ru/';
  }

});


// ----------------------------
// СОХРАНЕНИЕ РУЧНОГО ВЫБОРА
// ----------------------------

document.addEventListener('DOMContentLoaded', () => {

  const langLinks = document.querySelectorAll('.langswitch a');

  langLinks.forEach(link => {

    link.addEventListener('click', () => {

      // Если ссылка ведёт в RU
      if (link.getAttribute('href').includes('/ru')) {
        localStorage.setItem('preferredLang', 'ru');
      }

      // Иначе EN
      else {
        localStorage.setItem('preferredLang', 'en');
      }

    });

  });

});