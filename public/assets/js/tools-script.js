// ───── CONSTANTS ─────────────────────────────────────────────
const UNDERGROUND_ENTRY_COST = 15.00; // USD equivalent per swipe / visitor pass
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEALS = ['Breakfast', 'Continental Breakfast', 'Lunch', 'Late Lunch', 'Dinner'];

const DB = {
    // ── Meal Plans ─────────────────────────────────────────────
    plans: {
        AllAccessPlan: {
            name: 'All Access Plan',
            cost: 2820,
            swipes: null,
            exchanges: 20,
            visitorPasses: 10,
            bearcatBucks: 100,
            notes: 'Unlimited Underground entries. Up to 5 per day.'
        },
        BlockPlan165: {
            name: '165 Block Plan',
            cost: 2820,
            swipes: 145,
            exchanges: 20,
            visitorPasses: 10,
            bearcatBucks: 450,
            notes: 'Up to 5 Underground visits per day.'
        },
        BlockPlan100: {
            name: '100 Block Plan',
            cost: 1830,
            swipes: 90,
            exchanges: 10,
            visitorPasses: 5,
            bearcatBucks: 350,
            notes: 'Up to 5 Underground visits per day.'
        },
        BlockPlan50: {
            name: '50 Block Plan',
            cost: 1100,
            swipes: 50,
            exchanges: 10,
            visitorPasses: 0,
            bearcatBucks: 275,
            notes: 'No visitor passes included.'
        },
        BlockPlan350: {
            name: '350 Bearcat Bucks Plan',
            cost: 350,
            swipes: 0,
            exchanges: 0,
            visitorPasses: 0,
            bearcatBucks: 350,
            notes: 'Bearcat Bucks only — no Underground swipes or meal exchanges. Ideal for commuters.'
        }
    },

    // ── Dining Locations ───────────────────────────────────────
    locations: [
        {
            id: 'underground',
            name: 'Dining Hall',
            building: 'Grier Student Center',
            type: 'underground',
            accepted: ['swipes', 'visitorPasses', 'bearcatBucks'],
            detail: 'All-you-care-to-eat. Entry costs 1 swipe, 1 visitor pass, or $15.00 in Bearcat Bucks.',
            hours: 'Mon–Fri 7am–8pm, Sat–Sun 10am–7pm',
            wait: 'low',
            waitLabel: '< 5 min'
        },
        {
            id: 'chickfila',
            name: 'Chick-fil-A',
            building: 'Grier Student Center',
            type: 'restaurant',
            accepted: ['exchanges', 'bearcatBucks'],
            detail: 'Meal exchanges accepted. Bearcat Bucks also accepted at face value.',
            hours: 'Mon–Fri 10:30am–8pm, Sat 11am–5pm',
            wait: 'high',
            waitLabel: '15–20 min'
        },
        {
            id: 'starbucks',
            name: 'Starbucks',
            building: 'Jackson Library',
            type: 'restaurant',
            accepted: ['exchanges', 'bearcatBucks'],
            detail: 'Full Starbucks menu. Meal exchanges and Bearcat Bucks accepted.',
            hours: 'Mon–Thu 7:30am–9pm, Fri 7:30am–5pm',
            wait: 'med',
            waitLabel: '5–10 min'
        },
        {
            id: 'thedrop',
            name: 'The Drop',
            building: 'Campus Center',
            type: 'restaurant',
            accepted: ['exchanges', 'bearcatBucks'],
            detail: 'Grill favorites. Meal exchanges and Bearcat Bucks accepted.',
            hours: 'Mon–Fri 11am–3pm',
            wait: 'med',
            waitLabel: '8–12 min'
        },
        {
            id: 'freshens',
            name: 'Freshens',
            building: 'Grier Student Center',
            type: 'restaurant',
            accepted: ['exchanges', 'bearcatBucks'],
            detail: 'Smoothies and wraps. Meal exchanges and Bearcat Bucks accepted.',
            hours: 'Mon–Fri 9am–5pm',
            wait: 'low',
            waitLabel: '< 2 min'
        },
        {
            id: 'marketplace',
            name: 'Greenwood Marketplace',
            building: 'Grier Student Center',
            type: 'restaurant',
            accepted: ['exchanges', 'bearcatBucks'],
            detail: 'Grab-and-go retail. Meal exchanges and Bearcat Bucks accepted.',
            hours: 'Mon–Fri 8am–9pm, Sat 10am–5pm',
            wait: 'med',
            waitLabel: '8–12 min'
        },
        {
            id: 'pantry',
            name: 'Bear Necessities Food Pantry',
            building: 'CPO Building',
            type: 'pantry',
            accepted: [],
            detail: 'Free food and essentials available to all Lander students. Confidential and welcoming.',
            hours: 'Mon–Fri 9am–4pm',
            wait: 'low',
            waitLabel: 'No wait'
        }
    ],

    // ── Today's Menu (keyed by meal period) ───────────────────
    menus: {
        breakfast: [
            { name: 'Scrambled Eggs', tags: ['protein'], type: 'm', location: 'underground' },
            { name: 'Oatmeal Bar', tags: ['veg'], type: 'v', location: 'underground' },
            { name: 'Pancakes', tags: [], type: 'v', location: 'underground' },
            { name: 'Bacon Strip', tags: [], type: 'm', location: 'underground' },
            { name: 'Fruit Salad', tags: ['gf', 'veg'], type: 'g', location: 'underground' },
            { name: 'Yogurt Parfait', tags: ['gf'], type: 'g', location: 'underground' },
            { name: 'Latte', tags: [], type: 'v', location: 'starbucks' },
            { name: 'Bacon Egg Biscuit', tags: [], type: 'm', location: 'chickfila' }
        ],
        continentalBreakfast: [
            { name: 'Bagel & Cream Cheese', tags: ['veg'], type: 'v', location: 'underground' },
            { name: 'Muffin Assortment', tags: ['veg'], type: 'v', location: 'underground' },
            { name: 'Orange Juice', tags: ['gf', 'veg'], type: 'g', location: 'underground' },
            { name: 'Cereal Bar', tags: ['veg'], type: 'v', location: 'underground' }
        ],
        lunch: [
            { name: 'Grilled Chicken Sandwich', tags: [], type: 'm', location: 'underground' },
            { name: 'Black Bean Burger', tags: ['veg'], type: 'v', location: 'underground' },
            { name: 'Caesar Salad', tags: [], type: 'v', location: 'underground' },
            { name: 'Tomato Soup', tags: ['veg', 'gf'], type: 'g', location: 'underground' },
            { name: 'Mac & Cheese', tags: ['veg'], type: 'v', location: 'underground' },
            { name: 'Beef Tacos', tags: [], type: 'm', location: 'underground' },
            { name: 'Spicy Deluxe Sandwich', tags: [], type: 'm', location: 'chickfila' },
            { name: 'Smoothie Bowl', tags: ['veg', 'gf'], type: 'g', location: 'freshens' }
        ],
        lateLunch: [
            { name: 'Flatbread Pizza', tags: ['veg'], type: 'v', location: 'thedrop' },
            { name: 'Turkey Club Wrap', tags: [], type: 'm', location: 'thedrop' },
            { name: 'Cold Brew', tags: ['gf', 'veg'], type: 'g', location: 'starbucks' },
            { name: 'Protein Box', tags: ['gf'], type: 'm', location: 'starbucks' }
        ],
        dinner: [
            { name: 'Roast Chicken', tags: ['gf'], type: 'm', location: 'underground' },
            { name: 'Pasta Primavera', tags: ['veg'], type: 'v', location: 'underground' },
            { name: 'Stir Fry Tofu', tags: ['veg', 'gf'], type: 'g', location: 'underground' },
            { name: 'Mashed Potatoes', tags: ['veg', 'gf'], type: 'g', location: 'underground' },
            { name: 'Garden Salad Bar', tags: ['veg', 'gf'], type: 'v', location: 'underground' },
            { name: 'Salmon Fillet', tags: ['gf'], type: 'm', location: 'underground' }
        ]
    },

    // ── Price List ─────────────────────────────────────────────
    prices: [
        { id: 1, name: 'Underground Entry', price: 14.50, location: 'underground', category: 'entry', payWith: ['swipes', 'visitorPasses', 'bearcatBucks'], votes: 0 },
        { id: 2, name: 'Spicy Deluxe (CFA)', price: 6.45, location: 'chickfila', category: 'entree', payWith: ['exchanges', 'bearcatBucks'], votes: 24 },
        { id: 3, name: 'Waffle Fries (CFA)', price: 3.35, location: 'chickfila', category: 'side', payWith: ['exchanges', 'bearcatBucks'], votes: 18 },
        { id: 4, name: 'Latte — 16oz', price: 5.25, location: 'starbucks', category: 'drink', payWith: ['exchanges', 'bearcatBucks'], votes: 41 },
        { id: 5, name: 'Cold Brew', price: 4.75, location: 'starbucks', category: 'drink', payWith: ['exchanges', 'bearcatBucks'], votes: 29 },
        { id: 6, name: 'Protein Box', price: 6.95, location: 'starbucks', category: 'snack', payWith: ['exchanges', 'bearcatBucks'], votes: 12 },
        { id: 7, name: 'Smoothie', price: 6.50, location: 'freshens', category: 'drink', payWith: ['exchanges', 'bearcatBucks'], votes: 33 },
        { id: 8, name: 'Wrap', price: 7.25, location: 'freshens', category: 'entree', payWith: ['exchanges', 'bearcatBucks'], votes: 9 },
        { id: 9, name: 'Flatbread Pizza', price: 5.50, location: 'thedrop', category: 'entree', payWith: ['exchanges', 'bearcatBucks'], votes: 28 },
        { id: 10, name: 'Turkey Club Wrap', price: 6.75, location: 'thedrop', category: 'entree', payWith: ['exchanges', 'bearcatBucks'], votes: 16 },
        { id: 11, name: 'Bottle of Water', price: 2.00, location: 'marketplace', category: 'drink', payWith: ['exchanges', 'bearcatBucks'], votes: 55 },
        { id: 12, name: 'Bag of Chips', price: 1.75, location: 'marketplace', category: 'snack', payWith: ['exchanges', 'bearcatBucks'], votes: 28 },
        { id: 13, name: 'Oatmeal Bowl', price: 4.50, location: 'marketplace', category: 'snack', payWith: ['exchanges', 'bearcatBucks'], votes: 16 }
    ]
};


function openCard(id) {
    const card = document.getElementById('card-' + id);
    card.querySelector('.card-preview').style.display = 'none';
    card.querySelector('.card-body').style.display = 'flex';
    if (id === 'wait') initWait();
    if (id === 'menu') initMenu('breakfast');
    if (id === 'schedule') initSchedule();
    if (id === 'price') initPrices();
    if (id === 'balance') loadBalance();
    if (id === 'plan') { selectedPlan = 'AllAccessPlan'; renderPlanChips(); updatePlan(); }
}
function closeCard(id) {
    const card = document.getElementById('card-' + id);
    card.querySelector('.card-preview').style.display = 'flex';
    card.querySelector('.card-body').style.display = 'none';
}

function initWait() {
    const list = document.getElementById('wait-list');
    list.innerHTML = DB.locations
        .filter(l => l.type !== 'pantry')
        .map(l => {
            const currencies = l.accepted.map(c => currencyLabel(c)).join(', ') || 'Free';
            return `
      <div class="location-row">
        <div>
          <div class="loc-name">${l.name}</div>
          <div class="loc-detail">${l.hours}</div>
          <div class="loc-accepts">Accepts: <strong>${currencies}</strong></div>
        </div>
        <div class="wait-badge wait-${l.wait}">${l.waitLabel}</div>
      </div>`;
        }).join('');
    const now = new Date();
    document.getElementById('wait-updated').textContent =
        `Last updated ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function currencyLabel(key) {
    return { swipes: 'Swipes', visitorPasses: 'Visitor Passes', bearcatBucks: 'Bearcat Bucks', exchanges: 'Meal Exchanges' }[key] || key;
}

function reportWait() {
    showForm('reportTime');
    // const loc = prompt('Which location?');
    // if (!loc) return;
    // const mins = prompt('Approximate wait in minutes?');
    // if (!mins) return;
    // alert(`Thanks! "${loc}" reported as ~${mins} min. (Demo — in production this updates the live feed.)`);
}

const dotMap = { v: 'dot-v', g: 'dot-g', m: 'dot-m' };
const mealKeys = ['breakfast', 'continentalBreakfast', 'lunch', 'lateLunch', 'dinner'];

function initMenu(meal) {
    // ensure first tab is active on open
    const firstTab = document.querySelector('.foodMenu-tab');
    if (firstTab) switchMeal(meal, firstTab);
}

function switchMeal(mealKey, el) {
    document.querySelectorAll('.foodMenu-tab').forEach(t => t.classList.remove('on'));
    if (el) el.classList.add('on');

    const items = DB.menus[mealKey] || [];
    const loc = document.getElementById('menu-location-filter')?.value || 'all';

    const filtered = loc === 'all' ? items : items.filter(i => i.location === loc);

    if (filtered.length === 0) {
        document.getElementById('foodMenu-items').innerHTML =
            '<div class="empty-state">No items for this meal period.</div>';
        return;
    }

    document.getElementById('foodMenu-items').innerHTML = filtered.map(i => {
        const locName = DB.locations.find(l => l.id === i.location)?.name || i.location;
        return `
    <div class="foodMenu-item">
      <div class="foodMenu-dot ${dotMap[i.type]}"></div>
      <div class="foodMenu-name">${i.name}</div>
      <div class="foodMenu-tag">${i.tags.join(' ')}</div>
      <div class="foodMenu-loc">${locName}</div>
    </div>`;
    }).join('');
}

const schedDays = {};
DAYS.forEach(d => { schedDays[d] = { on: false, meals: [] }; });

function initSchedule() {
    const container = document.getElementById('day-rows');
    container.innerHTML = DAYS.map(d => `
  <div class="day-row">
    <input class="day-check" type="checkbox" id="chk-${d}" onchange="toggleDay('${d}')" />
    <span class="day-name">${d}</span>
    <div class="meal-pills" id="pills-${d}">
      ${MEALS.map(m => `<div class="meal-pill" onclick="toggleMeal('${d}','${m}',this)">${m.slice(0, 3)}</div>`).join('')}
    </div>
  </div>`).join('');
}

function toggleDay(d) {
    const on = document.getElementById('chk-' + d).checked;
    schedDays[d].on = on;
    if (!on) schedDays[d].meals = [];
    document.querySelectorAll(`#pills-${d} .meal-pill`).forEach(p => { if (!on) p.classList.remove('on'); });
    rebuildSchedule();
}

function toggleMeal(d, m, el) {
    if (!schedDays[d].on) return;
    el.classList.toggle('on');
    const arr = schedDays[d].meals;
    const idx = arr.indexOf(m);
    if (idx > -1) arr.splice(idx, 1); else arr.push(m);
    rebuildSchedule();
}

function rebuildSchedule() {
    const planKey = document.getElementById('plan-select').value;
    const locType = document.getElementById('sched-loc-type')?.value || 'underground';
    const output = document.getElementById('sched-output');
    
    if (!planKey) {
        output.textContent = '← Select a plan, location type, and days above.';
        return;
    }

    const plan = DB.plans[planKey];
    if (!plan) { output.textContent = 'Unknown plan.'; return; }
    

    // Count total planned meals across all selected days
    let totalMeals = 0;
    DAYS.forEach(d => { if (schedDays[d].on) totalMeals += schedDays[d].meals.length; });

    let html = '';
    DAYS.forEach(d => {
        if (!schedDays[d].on || schedDays[d].meals.length === 0) return;
        html += `<div class="meal-entry"><span>${d}:</span> ${schedDays[d].meals.join(', ')}</div>`;
    });

    if (!html) {
        output.innerHTML = '<span style="color:var(--text-light)">Select days and meal times above.</span>';
        return;
    }

    let summaryHtml = '';

    if (locType === 'underground') {
        // ── Underground: paid with swipes, visitor passes, OR Bearcat Bucks
        const unlimited = plan.swipes === null;
        const swipesAvail = unlimited ? Infinity : plan.swipes;
        const bearcatAvail = plan.bearcatBucks;

        if (unlimited) {
            summaryHtml = `
        <div class="sched-summary ok">
          ✓ Unlimited swipes — all <strong>${totalMeals}</strong> Underground meals covered.
        </div>`;
        } else {
            const swipesUsed = Math.min(totalMeals, swipesAvail);
            const overSwipes = Math.max(0, totalMeals - swipesAvail);
            // overages must be paid with Bearcat Bucks ($15.00 each)
            const bearcatNeeded = overSwipes * UNDERGROUND_ENTRY_COST;
            const bearcatAfter = bearcatAvail - bearcatNeeded;
            const fullyFunded = bearcatAfter >= 0;

            summaryHtml = `
        <div class="sched-summary ${fullyFunded ? 'ok' : 'warn'}">
          <div>Underground entries planned: <strong>${totalMeals}</strong></div>
          <div>Swipes available: <strong>${swipesAvail}</strong> → using <strong>${swipesUsed}</strong></div>
          ${overSwipes > 0 ? `
          <div class="sched-line warn">
            ${overSwipes} entries exceed swipe balance →
            costs <strong>$${bearcatNeeded.toFixed(2)}</strong> in Bearcat Bucks
          </div>
          <div class="${fullyFunded ? '' : 'sched-line warn'}">
            Bearcat Bucks after: <strong>$${bearcatAfter.toFixed(2)}</strong>
            ${!fullyFunded ? '⚠ Insufficient Bearcat Bucks to cover all entries.' : '✓'}
          </div>` : '<div>✓ All entries covered by swipes. No Bearcat Bucks needed.</div>'}
          <div class="sched-note">
            Visitor passes (${plan.visitorPasses}) are separate and for guests only.
          </div>
        </div>`;
        }
    } else {
        // ── Restaurant: paid with meal exchanges OR Bearcat Bucks
        const exchangesAvail = plan.exchanges;
        const exchangesUsed = Math.min(totalMeals, exchangesAvail);
        const overExchanges = Math.max(0, totalMeals - exchangesAvail);
        // Restaurant meal average — user can override but we use $8 as estimate
        const avgMealCost = 8.00;
        const bearcatNeeded = overExchanges * avgMealCost;
        const bearcatAfter = plan.bearcatBucks - bearcatNeeded;
        const fullyFunded = bearcatAfter >= 0;
        summaryHtml = `
      <div class="sched-summary ${fullyFunded ? 'ok' : 'warn'}">
        <div>Restaurant meals planned: <strong>${totalMeals}</strong></div>
        <div>Meal exchanges available: <strong>${exchangesAvail}</strong> → using <strong>${exchangesUsed}</strong></div>
        ${overExchanges > 0 ? `
        <div class="sched-line warn">
          ${overExchanges} meals exceed exchange balance →
          est. <strong>$${bearcatNeeded.toFixed(2)}</strong> from Bearcat Bucks (~$${avgMealCost}/meal)
        </div>
        <div class="${fullyFunded ? '' : 'sched-line warn'}">
          Bearcat Bucks after: <strong>$${bearcatAfter.toFixed(2)}</strong>
          ${!fullyFunded ? '⚠ May run short — consider fewer restaurant meals or a higher plan.' : '✓'}
        </div>` : '<div>✓ All restaurant meals covered by exchanges.</div>'}
        <div class="sched-note">Swipes and visitor passes are not valid at restaurants.</div>
      </div>`;
    }

    output.innerHTML = html + summaryHtml;
}

// Live vote counts kept in memory (could be persisted to localStorage)
const voteCounts = {};
DB.prices.forEach(p => { voteCounts[p.id] = p.votes; });

function initPrices() { filterPrices(); }

function filterPrices() {
    const q = (document.getElementById('price-search')?.value || '').toLowerCase();
    const locF = document.getElementById('price-loc-filter')?.value || 'all';

    const filtered = DB.prices.filter(p =>
        p.name.toLowerCase().includes(q) &&
        (locF === 'all' || p.location === locF)
    );

    document.getElementById('price-list').innerHTML = filtered.map(p => {
        const locObj = DB.locations.find(l => l.id === p.location);
        const locName = locObj?.name || p.location;
        const accepts = p.payWith.map(currencyLabel).join(' · ');
        return `
    <div class="price-row">
      <div>
        <div class="item-name">${p.name}</div>
        <div class="item-loc">${locName}</div>
        <div class="item-accepts">Pay with: ${accepts}</div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <span class="item-price">$${p.price.toFixed(2)}</span>
        <div class="vote-row">
          <button class="vote-btn" onclick="vote(${p.id}, 1)">▲</button>
          <span class="vote-count" id="vc-${p.id}">${voteCounts[p.id]}</span>
          <button class="vote-btn" onclick="vote(${p.id},-1)">▼</button>
        </div>
      </div>
    </div>`;
    }).join('');
}

function vote(id, dir) {
    voteCounts[id] = Math.max(0, (voteCounts[id] || 0) + dir);
    const el = document.getElementById('vc-' + id);
    if (el) el.textContent = voteCounts[id];
}

function addPricePrompt() {
    showForm('reportPrice');
    // const name = prompt('Item name?');
    // if (!name) return;
    // const price = parseFloat(prompt('Price (numbers only, e.g. 4.50)?'));
    // if (isNaN(price)) return;
    // const locId = prompt('Location ID? (underground / chickfila / starbucks / thedrop / freshens / marketplace)') || 'marketplace';
    // const isUnderground = locId === 'underground';
    // const newItem = {
    //     id: Date.now(),
    //     name,
    //     price,
    //     location: locId,
    //     category: 'other',
    //     payWith: isUnderground ? ['swipes', 'visitorPasses', 'bearcatBucks'] : ['exchanges', 'bearcatBucks'],
    //     votes: 1
    // };
    // DB.prices.push(newItem);
    // voteCounts[newItem.id] = 1;
    // filterPrices();
}

// Populate location filter dropdown (called on page load)
function populatePriceLocFilter() {
    const sel = document.getElementById('price-loc-filter');
    if (!sel) return;
    DB.locations.filter(l => l.type !== 'pantry').forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.id;
        opt.textContent = l.name;
        sel.appendChild(opt);
    });
}

function loadBalance() {
    ['swipes', 'exchanges', 'visitorPasses', 'bearcatBucks'].forEach(k => {
        const stored = localStorage.getItem('balance_' + k);
        const input = document.getElementById('in-' + k);
        if (input && stored !== null) input.value = stored;
    });
    updateBalance();
}

function updateBalance() {
    const vals = {};
    ['swipes', 'exchanges', 'visitorPasses', 'bearcatBucks'].forEach(k => {
        const input = document.getElementById('in-' + k);
        const display = document.getElementById('b-' + k);
        const val = input ? input.value : '';
        localStorage.setItem('balance_' + k, val);
        vals[k] = val !== '' ? parseFloat(val) : null;
        if (display) {
            display.textContent = val !== ''
                ? (k === 'bearcatBucks' ? '$' + parseFloat(val).toFixed(2) : val)
                : '—';
        }
    });

    // Underground purchasing power summary
    const sw = vals.swipes ?? 0;
    const vp = vals.visitorPasses ?? 0;
    const bb = vals.bearcatBucks ?? 0;
    const ex = vals.exchanges ?? 0;
    const undergroundEntries = sw + vp + Math.floor(bb / UNDERGROUND_ENTRY_COST);
    const restaurantMeals = ex;
    const summaryEl = document.getElementById('balance-summary');
    if (summaryEl) {
        summaryEl.innerHTML = `
      <div class="bal-row">
        <span>Underground entries available</span>
        <strong>${sw} swipes + ${vp} visitor passes + ${Math.floor(bb / UNDERGROUND_ENTRY_COST)} via Bearcat = <em>${undergroundEntries} total</em></strong>
      </div>
      <div class="bal-row">
        <span>Restaurant meals (exchanges)</span>
        <strong>${restaurantMeals} exchanges + $${bb.toFixed(2)} Bearcat Bucks</strong>
      </div>
      <div class="bal-row">
        <span>Est. Underground value remaining</span>
        <strong>$${((sw + vp) * UNDERGROUND_ENTRY_COST + bb).toFixed(2)}</strong>
      </div>`;
    }
}

let selectedPlan = 'AllAccessPlan';

function renderPlanChips() {
    const container = document.getElementById('plan-chips');
    if (!container) return;
    container.innerHTML = Object.entries(DB.plans).map(([key, p]) => `
    <div class="plan-chip ${key === selectedPlan ? 'on' : ''}"
         onclick="selectPlan('${key}', this)">
      ${p.name}
    </div>`).join('');
}

function selectPlan(key, el) {
    selectedPlan = key;
    document.querySelectorAll('.plan-chip').forEach(c => c.classList.remove('on'));
    el.classList.add('on');
    updatePlan();
}

function updatePlan() {
    const mealsPerDay = parseInt(document.getElementById('meals-per-day')?.value) || 3;
    const p = DB.plans[selectedPlan];
    if (!p) return;
    const WEEKS = 16;
    const totalDays = WEEKS * 7;
    // ── True dollar value of included resources ─────────────────
    const unlimitedSwipes = p.swipes === null;
    const swipeCount = unlimitedSwipes ? mealsPerDay * totalDays : p.swipes;
    const swipeValue = swipeCount * UNDERGROUND_ENTRY_COST;
    // Visitor passes: same value as swipes
    const visitorValue = p.visitorPasses * UNDERGROUND_ENTRY_COST;
    // Bearcat Bucks: 1:1 USD
    const bearcatValue = p.bearcatBucks;
    // Meal exchanges: we use avg $8/meal as proxy (typical restaurant combo)
    const AVG_RESTAURANT = 8.00;
    const exchangeValue = p.exchanges * AVG_RESTAURANT;
    const totalValue = swipeValue + visitorValue + bearcatValue + exchangeValue;
    const savings = totalValue - p.cost;
    const savingsPct = ((savings / p.cost) * 100).toFixed(1);

    // ── Coverage check for student's eating habits ──────────────
    // Assume student eats ALL meals at Underground
    const mealsNeeded = mealsPerDay * totalDays;
    let coveragePct;
    if (unlimitedSwipes) {
        coveragePct = 100;
    } else {
        // Can supplement swipes with Bearcat Bucks ($15.00 per entry)
        const bearcatEntries = Math.floor(p.bearcatBucks / UNDERGROUND_ENTRY_COST);
        const totalEntries = p.swipes + bearcatEntries;
        coveragePct = Math.min(100, Math.round((totalEntries / mealsNeeded) * 100));
    }

    document.getElementById('plan-detail').innerHTML = `
    <div class="plan-row"><span class="pl">Plan</span><span class="pr">${p.name}</span></div>
    <div class="plan-row"><span class="pl">Semester Cost</span><span class="pr">$${p.cost.toLocaleString()}</span></div>
    <hr class="plan-hr">

    <div class="plan-section-label">Underground (Dining Hall)</div>
    <div class="plan-row">
      <span class="pl">Swipes</span>
      <span class="pr">${unlimitedSwipes ? 'Unlimited' : p.swipes + ' swipes'} · $${UNDERGROUND_ENTRY_COST.toFixed(2)}/ea = <strong>$${swipeValue.toLocaleString()}</strong>${unlimitedSwipes ? '*' : ''}</span>
    </div>
    <div class="plan-row">
      <span class="pl">Visitor Passes</span>
      <span class="pr">${p.visitorPasses} passes · $${UNDERGROUND_ENTRY_COST.toFixed(2)}/ea = <strong>$${visitorValue.toFixed(2)}</strong></span>
    </div>
    <div class="plan-row indent"><span class="pl-note">↳ Swipes & visitor passes valid at Underground only</span></div>

    <div class="plan-section-label">Restaurants (Chick-fil-A, Starbucks, etc.)</div>
    <div class="plan-row">
      <span class="pl">Meal Exchanges</span>
      <span class="pr">${p.exchanges} exchanges · ~$${AVG_RESTAURANT.toFixed(2)}/meal = <strong>~$${exchangeValue.toFixed(2)}</strong></span>
    </div>
    <div class="plan-row indent"><span class="pl-note">↳ Exchanges valid at restaurants only, not Underground</span></div>

    <div class="plan-section-label">Universal (anywhere)</div>
    <div class="plan-row">
      <span class="pl">Bearcat Bucks</span>
      <span class="pr">$${p.bearcatBucks} · 1:1 USD = <strong>$${bearcatValue.toFixed(2)}</strong></span>
    </div>
    <div class="plan-row indent"><span class="pl-note">↳ Underground entry costs $${UNDERGROUND_ENTRY_COST.toFixed(2)} in Bearcat; restaurants at face value</span></div>

    <hr class="plan-hr">
    <div class="plan-row total">
      <span class="pl">Total Estimated Value</span>
      <span class="pr">$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
    </div>
    <div class="plan-row total ${savings >= 0 ? 'ok' : 'warn'}">
      <span class="pl">${savings >= 0 ? 'You save vs. paying out-of-pocket' : 'Cost exceeds est. value'}</span>
      <span class="pr">${savings >= 0 ? '+' : ''}$${savings.toFixed(2)} (${savingsPct}%)</span>
    </div>

    <div style="height:6px;border-radius:3px;background:var(--border);margin:0.75rem 0 0.25rem;">
      <div class="plan-value-bar" style="width:${coveragePct}%"></div>
    </div>
    <div style="font-size:0.72rem;color:var(--text-light);">
      ${unlimitedSwipes
            ? `Unlimited plan — all ${mealsPerDay} meals/day covered for the full semester.`
            : `${coveragePct}% of your ${mealsPerDay} meals/day habit covered by swipes + Bearcat Bucks combined.`
        }
    </div>
    ${unlimitedSwipes ? `<div style="font-size:0.68rem;color:var(--text-light);margin-top:0.2rem;">* Value estimated at ${mealsPerDay} meals/day × ${totalDays} days.</div>` : ''}
  `;

    document.getElementById('plan-savings').textContent =
        savings >= 0
            ? `This plan saves you an estimated $${savings.toFixed(2)} versus paying out-of-pocket all semester.`
            : `This plan costs more than the estimated value — consider a smaller plan if you eat fewer meals.`;
}

document.addEventListener('DOMContentLoaded', () => {
    populatePriceLocFilter();
});

function showForm(formId) {
  document.getElementById(formId).style.display = 'block';
}

function closeForm(formId) {
  document.getElementById(formId).style.display = 'none';
}