/* Helpers */
const qsa = s => Array.from(document.querySelectorAll(s));
const $  = s => document.querySelector(s);

/* Payment/sample links updater */
function updateLinksByLang(lang){
  // pay buttons
  qsa('[data-pay]').forEach(btn=>{
    const url = btn.dataset['link'+lang.toUpperCase()];
    if (url && url.trim()!==''){
      btn.href = url;
      btn.classList.remove('disabled');
      if(lang==='ru') btn.textContent = btn.textContent.replace(/Скоро/i,'Предзаказ');
      if(lang==='en') btn.textContent = btn.textContent.replace(/Coming soon/i,'Pre-order');
      if(lang==='it') btn.textContent = btn.textContent.replace(/Presto/i,'Pre-ordina');
    } else {
      btn.href = '#';
      btn.classList.add('disabled');
      if(lang==='ru') btn.textContent = 'Скоро';
      if(lang==='en') btn.textContent = 'Coming soon';
      if(lang==='it') btn.textContent = 'Presto';
    }
  });

  // sample buttons
  qsa('[data-sample]').forEach(btn=>{
    const url = btn.dataset['sample'+lang.toUpperCase()];
    if (url && url.trim()!==''){
      btn.href = url;
      btn.classList.remove('disabled');
      if(lang==='ru') btn.textContent = 'Скачать отрывок PDF';
      if(lang==='en') btn.textContent = 'Download sample (PDF)';
      if(lang==='it') btn.textContent = "Scarica l’estratto (PDF)";
    } else {
      btn.href = '#';
      btn.classList.add('disabled');
      if(lang==='ru') btn.textContent = 'Скоро (PDF)';
      if(lang==='en') btn.textContent = 'Coming soon (PDF)';
      if(lang==='it') btn.textContent = 'Presto (PDF)';
    }
  });

  // sticky CTA title
  const sticky = document.querySelector('.sticky-cta .cta');
  if(sticky){
    sticky.textContent = (lang==='ru')?'Предзаказ':(lang==='en')?'Pre-order':'Pre-ordine';
  }
}

/* Language detection + toggle */
(function(){
  const getLangFromUrl = () => new URLSearchParams(location.search).get('lang');
  const navLang = (navigator.language||'').toLowerCase();
  const guess = navLang.startsWith('ru') ? 'ru' : navLang.startsWith('it') ? 'it' : 'en';
  const saved = localStorage.getItem('lang') || getLangFromUrl() || guess || 'ru';

  function setLang(lang){
    qsa('.lang').forEach(el => el.classList.remove('active'));
    qsa('.lang.'+lang).forEach(el => el.classList.add('active'));
    qsa('.langswitch button').forEach(b => b.classList.toggle('active', b.dataset.lang===lang));
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    updateLinksByLang(lang);
    // deadlines text locale
    updateDeadlineTexts(lang);
  }

  qsa('.langswitch button').forEach(btn=>btn.addEventListener('click',()=>setLang(btn.dataset.lang)));
  setLang(saved);
})();

/* Early price deadline — set your date once */
const deadline = new Date('2025-10-25T23:59:59'); // ← поменяйте при необходимости
function updateDeadlineTexts(currentLang){
  const fmt = (d, locale) => d.toLocaleDateString(locale, {year:'numeric', month:'long', day:'numeric'});
  const map = {ru:'ru-RU', en:'en-GB', it:'it-IT'};
  const loc = map[currentLang] || 'en-GB';
  const text = fmt(deadline, loc);
  const ids = {
    ru:['dl-ru','dl-ru-2'],
    en:['dl-en','dl-en-2'],
    it:['dl-it','dl-it-2']
  };
  Object.entries(ids).forEach(([lang, arr])=>{
    arr.forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=text; });
  });
}
updateDeadlineTexts(localStorage.getItem('lang')||'ru');

/* Smooth scroll (for internal anchors) */
qsa('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id=a.getAttribute('href').slice(1), el=document.getElementById(id);
    if(el){e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});