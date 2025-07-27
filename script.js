// —— HERO TYPEWRITER —— //
const heroText = 'RUSTY SPACE ARMS BAZAAR';
let idx = 0;
const heroEl = document.getElementById('hero-text');
function typeHero() {
  if (idx <= heroText.length) {
    heroEl.textContent = heroText.slice(0, idx++);
    setTimeout(typeHero, 100);
  }
}
window.addEventListener('load', typeHero);

// —— WEAPON DATA & RENDER —— //
const weapons = [
  { id:1, name:'XR-9 Pulse Rifle', cat:'firearms', price:12000, img:'assets/weapon1.jpg', desc:'High‑velocity energy rounds.' },
  { id:2, name:'Vibroblade MK‑III', cat:'blades', price:4800, img:'assets/weapon2.jpg', desc:'Ultra‑sharp oscillating edge.' },
  { id:3, name:'Plasma Grenade', cat:'explosives', price:6200, img:'assets/weapon3.jpg', desc:'Frag radius 15m.' },
  // add more…
];

const grid = document.getElementById('weapon-grid');
function renderWeapons(filter={ cat:'all', price:'all' }) {
  grid.innerHTML = '';
  weapons.filter(w => {
    let okCat = filter.cat==='all' || w.cat===filter.cat;
    let okPrice = filter.price==='all' ||
      (filter.price==='low' && w.price<5000) ||
      (filter.price==='mid' && w.price>=5000 && w.price<=20000) ||
      (filter.price==='high' && w.price>20000);
    return okCat && okPrice;
  }).forEach(w => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${w.img}" alt="${w.name}">
      <div class="card-content">
        <h3>${w.name}</h3>
        <p>${w.desc}</p>
        <p class="price">${w.price.toLocaleString()} Cr</p>
      </div>`;
    card.addEventListener('click', ()=> openModal(w));
    grid.append(card);
  });
}
renderWeapons();

// —— FILTER EVENTS —— //
document.getElementById('category-filter').addEventListener('change', e => {
  renderWeapons({ 
    cat: e.target.value, 
    price: document.getElementById('price-filter').value 
  });
});
document.getElementById('price-filter').addEventListener('change', e => {
  renderWeapons({ 
    cat: document.getElementById('category-filter').value, 
    price: e.target.value 
  });
});

// —— MODAL LOGIC —— //
const modal = document.getElementById('detail-modal');
const closeBtn = modal.querySelector('.close-btn');
function openModal(w) {
  modal.classList.remove('hidden');
  modal.querySelector('#modal-img').src = w.img;
  modal.querySelector('#modal-title').textContent = w.name;
  modal.querySelector('#modal-desc').textContent = w.desc;
  modal.querySelector('#modal-price').textContent = w.price.toLocaleString() + ' Cr';
}
closeBtn.addEventListener('click', ()=> modal.classList.add('hidden'));
modal.addEventListener('click', e => {
  if (e.target===modal) modal.classList.add('hidden');
});

// —— GSAP ENTRANCE ANIMATIONS —— //
window.addEventListener('load', ()=> {
  gsap.from('.nav-panel', { y:-100, opacity:0, duration:1, ease:'power2.out' });
  gsap.from('.hero-panel h1', { x:-200, opacity:0, delay:1, duration:1, ease:'power2.out' });
  gsap.from('.hero-panel p, .hero-panel button', { y:50, opacity:0, delay:1.5, stagger:0.2, duration:0.8 });
  gsap.from('.deals-panel h2', { scrollTrigger:'#deals', y:50, opacity:0, duration:1 });
  gsap.from('.card', { scrollTrigger:'.grid', scale:0.8, opacity:0, stagger:0.1, duration:0.6 });
});
