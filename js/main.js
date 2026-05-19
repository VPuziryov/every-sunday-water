document.addEventListener('DOMContentLoaded', () => {

  // Если уже открыта русская версия —
  // ничего не делаем
  if (window.location.pathname.startsWith('/ru')) {
    return;
  }

  // Определяем язык браузера
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

  // Если пользователь с русским языком —
  // отправляем в /ru/
  if (isRu && window.location.pathname === '/') {
    window.location.href = '/ru/';
  }

});