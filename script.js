// Mobil gezinme menüsü
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
    menuToggle.textContent = isOpen ? '×' : '☰';
  });
}

// Etkinlikler sayfasında tarayıcı içinde çalışan arama ve kategori filtreleri
const eventSearch = document.querySelector('#event-search');
const eventCards = [...document.querySelectorAll('.event-list-card')];
const filterButtons = [...document.querySelectorAll('.filter-chip')];
const noResults = document.querySelector('#no-results');
let activeFilter = 'all';

function filterEvents() {
  if (!eventCards.length) return;
  const query = (eventSearch?.value || '').trim().toLocaleLowerCase('tr-TR');
  let visibleCount = 0;
  eventCards.forEach((card) => {
    const searchableText = `${card.dataset.search || ''} ${card.textContent || ''}`.toLocaleLowerCase('tr-TR');
    const matchesQuery = searchableText.includes(query);
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const isVisible = matchesQuery && matchesCategory;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  if (noResults) noResults.hidden = visibleCount !== 0;
}

if (eventSearch) eventSearch.addEventListener('input', filterEvents);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    filterEvents();
  });
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));
});
filterEvents();
