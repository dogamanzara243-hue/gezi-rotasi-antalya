document.addEventListener("DOMContentLoaded", () => {
    if (typeof SPOT_DATA === "undefined") {
        console.error("Hata: SPOT_DATA bulunamadı.");
        return;
    }
    renderTheme();
    renderNavigation();
    renderHero();
    renderVenueSummary();
    renderOverview();
    renderWhyVisit();
    renderMustSee();
    renderTransportation();
    renderWhereToStay();
    renderWhereToEat();
    setupEventListeners();
});

function renderTheme() {
    const validThemes = ["nature", "history", "sea", "museum"];
    const theme = validThemes.includes(SPOT_DATA.theme) ? SPOT_DATA.theme : "museum";
    document.body.classList.add(`theme-${theme}`);
}

function renderNavigation() {
    document.title = `${SPOT_DATA.title} | Akıllı Gezi Rehberi`;
    document.getElementById("breadcrumb-city").textContent = SPOT_DATA.title.split(" ")[0];
    document.getElementById("breadcrumb-title").textContent = SPOT_DATA.title;
}

function renderHero() {
    document.getElementById("hero-bg").src = SPOT_DATA.hero.coverImage;
    document.getElementById("hero-bg").alt = SPOT_DATA.title;
    document.querySelector("#badge-category span").textContent = SPOT_DATA.category;
    document.querySelector("#badge-honor span").textContent = SPOT_DATA.hero.badge;
    document.getElementById("hero-title").textContent = SPOT_DATA.title;
    document.getElementById("hero-subtitle").textContent = SPOT_DATA.subtitle;

    const statsContainer = document.getElementById("hero-stats");
    statsContainer.innerHTML = SPOT_DATA.hero.stats.map(stat => `
        <div class="border-r border-white/10 last:border-0 pr-2">
            <span class="block text-xs text-slate-400 uppercase tracking-wider">${stat.label}</span>
            <span class="text-sm sm:text-base md:text-lg font-semibold text-amber-400 truncate block">${stat.value}</span>
        </div>
    `).join("");
}

function renderVenueSummary() {
    document.getElementById("summary-badge-title").textContent = SPOT_DATA.venueSummary.badgeTitle;
    document.getElementById("summary-type-title").textContent = SPOT_DATA.venueSummary.typeTitle;
    document.getElementById("summary-description").textContent = SPOT_DATA.venueSummary.description;

    const detailsContainer = document.getElementById("summary-details");
    detailsContainer.innerHTML = SPOT_DATA.venueSummary.details.map(item => `
        <div class="bg-white/10 px-3 py-1.5 rounded-lg">
            <span class="text-slate-400">${item.label}:</span> ${item.value}
        </div>
    `).join("");
}

function renderOverview() {
    document.querySelector("#overview-title span:last-child").textContent = SPOT_DATA.overview.title;
    const paragraphsContainer = document.getElementById("overview-paragraphs");
    paragraphsContainer.innerHTML = SPOT_DATA.overview.paragraphs.map(p => `<p>${p}</p>`).join("");

    const notesContainer = document.getElementById("visitor-notes-list");
    notesContainer.innerHTML = SPOT_DATA.overview.visitorNotes.map((note, idx, arr) => `
        <li class="flex justify-between pb-2 ${idx !== arr.length - 1 ? 'border-b border-slate-100' : ''}">
            <span>${note.label}:</span>
            <span class="font-semibold text-slate-800">${note.value}</span>
        </li>
    `).join("");
}

function renderWhyVisit() {
    document.getElementById("why-visit-title").textContent = SPOT_DATA.whyVisit.title;
    document.getElementById("why-visit-subtitle").textContent = SPOT_DATA.whyVisit.subtitle;

    const cardsContainer = document.getElementById("why-visit-cards");
    cardsContainer.innerHTML = SPOT_DATA.whyVisit.cards.map(card => `
        <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 rounded-xl bg-theme-light text-theme flex items-center justify-center text-xl mb-4 group-hover:bg-theme group-hover:text-white transition-colors">
                <i class="${card.icon}"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">${card.title}</h3>
            <p class="text-slate-600 text-sm leading-relaxed">${card.description}</p>
        </div>
    `).join("");
}

function renderMustSee() {
    document.querySelector("#must-see-title span").textContent = SPOT_DATA.mustSee.title;
    const itemsContainer = document.getElementById("must-see-items");
    itemsContainer.innerHTML = SPOT_DATA.mustSee.items.map(item => `
        <div class="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <span class="text-xs font-bold text-theme uppercase tracking-wide">${item.category}</span>
            <h4 class="font-bold text-slate-900 text-base mt-1 mb-2">${item.title}</h4>
            <p class="text-xs text-slate-500 leading-relaxed">${item.description}</p>
        </div>
    `).join("");
}

function renderTransportation() {
    document.querySelector("#transport-title span").textContent = SPOT_DATA.transportation.title;
    const methodsContainer = document.getElementById("transport-methods");
    methodsContainer.innerHTML = SPOT_DATA.transportation.methods.map(method => `
        <div class="flex items-start space-x-3">
            <i class="${method.icon} text-theme text-lg mt-0.5"></i>
            <div>
                <strong class="text-slate-800 block">${method.title}</strong>
                ${method.detail}
            </div>
        </div>
    `).join("");

    document.getElementById("transport-tip").textContent = SPOT_DATA.transportation.tip;
    document.getElementById("map-link").href = SPOT_DATA.transportation.mapUrl;
    document.getElementById("map-bg-img").src = SPOT_DATA.transportation.mapBgImage;
}

function renderWhereToStay() {
    document.querySelector("#where-to-stay-title span").textContent = SPOT_DATA.whereToStay.title;
    const hotelContainer = document.getElementById("hotel-list");
    hotelContainer.innerHTML = SPOT_DATA.whereToStay.hotels.map(hotel => `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div class="space-y-1">
                <span class="text-[10px] font-bold text-theme bg-theme-light px-2 py-0.5 rounded-md">${hotel.badge}</span>
                <h4 class="font-bold text-slate-900 text-base">${hotel.name}</h4>
                <p class="text-xs text-slate-500"><i class="fa-solid fa-location-dot mr-1"></i> ${hotel.distance}</p>
            </div>
            <a href="${hotel.link}" target="_blank" rel="noopener" class="px-4 py-2 bg-theme-light hover:bg-theme hover:text-white text-theme rounded-xl text-xs font-semibold transition-colors">
                Otele Bak
            </a>
        </div>
    `).join("");
}

function renderWhereToEat() {
    document.querySelector("#where-to-eat-title span").textContent = SPOT_DATA.whereToEat.title;
    const restaurantContainer = document.getElementById("restaurant-list");
    restaurantContainer.innerHTML = SPOT_DATA.whereToEat.restaurants.map(rest => `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div class="space-y-1">
                <span class="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">${rest.badge}</span>
                <h4 class="font-bold text-slate-900 text-base">${rest.name}</h4>
                <p class="text-xs text-slate-500">${rest.detail}</p>
            </div>
            <span class="text-amber-500 text-xs font-bold flex items-center">
                <i class="fa-solid fa-star mr-1"></i> ${rest.rating}
            </span>
        </div>
    `).join("");
}

function setupEventListeners() {
    const favBtn = document.getElementById("btn-favorite");
    if(favBtn) {
        favBtn.addEventListener("click", () => alert(`${SPOT_DATA.title} favorilere eklendi!`));
    }
    const shareBtn = document.getElementById("btn-share");
    if(shareBtn) {
        shareBtn.addEventListener("click", () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Bağlantı panoya kopyalandı!");
            }
        });
    }
}
