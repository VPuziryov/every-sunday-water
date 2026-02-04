document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------
     ЯЗЫКИ
  ---------------------------- */

  const langButtons = document.querySelectorAll('[data-lang]');
  const langBlocks = document.querySelectorAll('.lang');

  function setLang(lang) {
    // переключаем активную кнопку языка
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // показываем нужные блоки
    langBlocks.forEach(block => {
      block.classList.toggle(
        'active',
        block.classList.contains(lang)
      );
    });

    // обновляем CTA / ссылки под язык
    updateLinks(lang);

    // сохраняем выбор
    localStorage.setItem('lang', lang);
  }

  // начальный язык
  const savedLang = localStorage.getItem('lang') || 'ru';
  setLang(savedLang);

  // клики по языкам
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
    });
  });


  /* ----------------------------
     CTA / ССЫЛКИ
  ---------------------------- */

  function updateLinks(lang) {
    const payButtons = document.querySelectorAll('[data-pay]');
    const sampleButtons = document.querySelectorAll('[data-sample]');

    // --- ПЛАТЁЖНЫЕ КНОПКИ ---
    payButtons.forEach(btn => {
      const link =
        btn.dataset['link' + lang.toUpperCase()] ||
        btn.getAttribute('href');

      // если ссылка есть — ставим
      if (link && link !== '#') {
        btn.href = link;
      }

      // ВАЖНО:
      // мы БОЛЬШЕ НИКОГДА не:
      // - меняем текст кнопки
      // - не пишем "Скоро"
      // - не дизейблим CTA
      btn.classList.remove('disabled');
    });

    // --- SAMPLE / PREVIEW (если вдруг используются) ---
    sampleButtons.forEach(btn => {
      const link =
        btn.dataset['sample' + lang.toUpperCase()] ||
        btn.getAttribute('href');

      if (link && link !== '#') {
        btn.href = link;
        btn.classList.remove('disabled');
      } else {
        // sample может быть реально недоступен
        // поэтому здесь допустим disabled, но БЕЗ подмены текста
        btn.classList.add('disabled');
      }
    });
  }


  /* ----------------------------
     STICKY CTA
  ---------------------------- */

  const sticky = document.querySelector('.sticky-cta .cta');

  function updateStickyText(lang) {
    if (!sticky) return;

    if (lang === 'ru') {
      sticky.textContent = 'Купить ранний доступ — €9.90';
    } else if (lang === 'en') {
      sticky.textContent = 'Get early access — €9.90';
    } else if (lang === 'it') {
      sticky.textContent = 'Accesso early — €9.90';
    }
  }

  updateStickyText(savedLang);

  // обновляем sticky при смене языка
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      updateStickyText(btn.dataset.lang);
    });
  });

});
