document.addEventListener('DOMContentLoaded', () => { initApp(); });

async function initApp() {
  try {
    const [genRes, catRes] = await Promise.all([
      fetch('content/general-info.json'),
      fetch('content/categories.json')
    ]);
    const generalInfo = await genRes.json();
    const categories = await catRes.json();

    renderHero(generalInfo);
    renderCategories(categories);
    renderAccommodation(generalInfo.accommodation);
    renderTransportation(generalInfo.transportation);
  } catch (err) {
    console.error('Render Hatası:', err);
  }
}

function renderHero(data) {
  document.getElementById('hero-section').style.backgroundImage = `url('${data.hero_image}')`;
  document.getElementById('hero-badge').innerHTML = `<i class="${data.badge_icon}"></i> ${data.badge}`;
  document.getElementById('hero-title').textContent = data.title;
  document.getElementById('hero-description').textContent = data.description;

  document.getElementById('hero-stats').innerHTML = data.stats.map(s => `
    <div class="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center text-white">
      <i class="${s.icon} text-emerald-400 text-xl mb-1"></i>
      <div class="text-xl font-extrabold">${s.value}</div>
      <div class="text-xs text-slate-200">${s.label}</div>
    </div>
  `).join('');
}

function renderCategories(categories) {
  document.getElementById('categories-container').innerHTML = categories.map(item => `
    <article class="destination-card bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between h-full">
      <div>
        <div class="relative h-64 w-full overflow-hidden bg-slate-100">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy">
          <span class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <i class="${item.badge_icon} text-emerald-400"></i> ${item.category_badge}
          </span>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-slate-900 mb-3">${item.title}</h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-6">${item.description}</p>
        </div>
      </div>
      <div class="p-6 pt-0">
        <a href="${item.target_url}" class="cta-affiliate-btn">
          <span>${item.button_text}</span>
          <i class="fa-solid fa-arrow-right text-xs"></i>
        </a>
      </div>
    </article>
  `).join('');
}

function renderAccommodation(data) {
  document.getElementById('accommodation-container').innerHTML = `
    <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl text-white grid grid-cols-1 lg:grid-cols-12 border border-slate-700">
      <div class="p-8 lg:p-12 lg:col-span-7 flex flex-col justify-center">
        <span class="text-emerald-400 font-bold text-xs uppercase mb-3"><i class="fa-solid fa-hotel"></i> Konaklama Rehberi</span>
        <h3 class="text-2xl font-extrabold mb-4">${data.title}</h3>
        <p class="text-slate-300 text-sm mb-6">${data.description}</p>
        <a href="${data.button_url}" target="_blank" class="cta-affiliate-btn !w-auto !inline-flex !px-6">
          <span>${data.button_text}</span><i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
        </a>
      </div>
      <div class="lg:col-span-5 h-64 lg:h-auto"><img src="${data.image}" class="w-full h-full object-cover"></div>
    </div>
  `;
}

function renderTransportation(data) {
  document.getElementById('transport-container').innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div class="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-4 text-xl"><i class="fa-solid fa-bus"></i></div>
        <h3 class="text-2xl font-bold text-slate-900 mb-3">${data.title}</h3>
        <p class="text-slate-600 text-sm mb-6">${data.description}</p>
        <ul class="space-y-3">${data.tips.map(t => `<li class="flex items-start gap-2 text-sm text-slate-600"><i class="fa-solid fa-circle-check text-emerald-600 mt-0.5"></i><span>${t}</span></li>`).join('')}</ul>
      </div>
      <div class="lg:col-span-6 aspect-map shadow-md border border-slate-200">
        <iframe src="${data.map_embed_url}" width="100%" height="100%" style="border:0;" loading="lazy"></iframe>
      </div>
    </div>
  `;
}
