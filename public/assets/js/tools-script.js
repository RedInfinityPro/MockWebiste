const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEALS = ['Breakfast', 'Continental Breakfast', 'Lunch', 'Late Lunch', 'Dinner'];

// ───── OPEN/CLOSE ─────
function openCard(id) {
    const card = document.getElementById('card-' + id);
    card.querySelector('.card-preview').style.display = 'none';
    card.querySelector('.card-body').style.display = 'flex';
    if (id === 'wait') initWait();
    if (id === 'menu') initMenu('breakfast');
    if (id === 'schedule') initSchedule();
    if (id === 'price') initPrices();
    if (id === 'balance') loadBalance();
    if (id === 'plan') { selectedPlan = 'AllAccessPlan'; updatePlan(); }
}
function closeCard(id) {
    const card = document.getElementById('card-' + id);
    card.querySelector('.card-preview').style.display = 'flex';
    card.querySelector('.card-body').style.display = 'none';
}

// ───── WAIT TIMES ─────
const locations = [
    { name: 'Dining Hall', detail: 'All-you-can-eat', wait: 'low', label: '< 5 min' },
    { name: 'Chick-fil-A', detail: 'Friendly service', wait: 'high', label: '15–20 min' },
    { name: 'Starbucks', detail: 'Communities and the environment', wait: 'med', label: '5–10 min' },
    { name: 'Freshens', detail: 'Positive feedback', wait: 'low', label: '< 2 min' },
    { name: 'Greenwood Marketplace', detail: 'Students and staff', wait: 'med', label: '8–12 min' },
    { name: 'Bear Necessities Food Pantry', detail: 'Pantry established', wait: 'med', label: '8–12 min' },
];

function initWait() {
    const list = document.getElementById('wait-list');
    list.innerHTML = locations.map(l => `
    <div class="location-row">
      <div><div class="loc-name">${l.name}</div><div class="loc-detail">${l.detail}</div></div>
      <div class="wait-badge wait-${l.wait}">${l.label}</div>
    </div>`).join('');
    const now = new Date();
    document.getElementById('wait-updated').textContent = `Last updated ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
}
function reportWait() {
    const loc = prompt('Which location? (enter name)');
    if (!loc) return;
    const mins = prompt('Approximate wait in minutes?');
    if (!mins) return;
    alert(`Thanks! "${loc}" reported as ~${mins} min. (Demo — in production this updates the live feed.)`);
}

// ───── TODAY'S MENU ─────
const menus = {
    breakfast: [
        { name: 'Scrambled Eggs', tag: 'protein', type: 'm' },
        { name: 'Oatmeal Bar', tag: 'veg', type: 'v' },
        { name: 'Pancakes', tag: '', type: 'v' },
        { name: 'Bacon Strip', tag: '', type: 'm' },
        { name: 'Fruit Salad', tag: 'gf veg', type: 'g' },
        { name: 'Yogurt Parfait', tag: 'gf', type: 'g' },
    ],
    continentalBreakfast: [
        {},
    ],
    lunch: [
        { name: 'Grilled Chicken Sandwich', tag: '', type: 'm' },
        { name: 'Black Bean Burger', tag: 'veg', type: 'v' },
        { name: 'Caesar Salad', tag: '', type: 'v' },
        { name: 'Tomato Soup', tag: 'veg gf', type: 'g' },
        { name: 'Mac & Cheese', tag: 'veg', type: 'v' },
        { name: 'Beef Tacos', tag: '', type: 'm' },
    ],
    lateLunch: [
        {},
    ],
    dinner: [
        { name: 'Roast Chicken', tag: 'gf', type: 'm' },
        { name: 'Pasta Primavera', tag: 'veg', type: 'v' },
        { name: 'Stir Fry Tofu', tag: 'veg gf', type: 'g' },
        { name: 'Mashed Potatoes', tag: 'veg gf', type: 'g' },
        { name: 'Garden Salad Bar', tag: 'veg gf', type: 'v' },
        { name: 'Salmon Fillet', tag: 'gf', type: 'm' },
    ]
};
const dotMap = { v: 'dot-v', g: 'dot-g', m: 'dot-m' };
function initMenu(meal) {
    switchMeal(meal, document.querySelector('.menu-tab.on'));
}
function switchMeal(meal, el) {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('on'));
    el.classList.add('on');
    const items = menus[meal];
    document.getElementById('menu-items').innerHTML = items.map(i => `
    <div class="menu-item">
      <div class="menu-dot ${dotMap[i.type]}"></div>
      <div class="menu-name">${i.name}</div>
      <div class="menu-tag">${i.tag}</div>
    </div>`).join('');
}

// ───── SCHEDULE PLANNER ─────
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
    const planVal = document.getElementById('plan-select').value;
    const swipesPerWeek = planVal === 'unlimited' ? 999 : parseInt(planVal) || 0;
    let totalMeals = 0;
    DAYS.forEach(d => { if (schedDays[d].on) totalMeals += schedDays[d].meals.length; });
    const output = document.getElementById('sched-output');
    if (!planVal) { output.textContent = '← Select a plan and days above.'; return; }
    let html = '';
    let remaining = swipesPerWeek;
    DAYS.forEach(d => {
        if (!schedDays[d].on || schedDays[d].meals.length === 0) return;
        html += `<div class="meal-entry"><span>${d}:</span> ${schedDays[d].meals.join(', ')}</div>`;
    });
    if (!html) { output.innerHTML = '<span style="color:var(--text-light)">Select days and meal times above.</span>'; return; }
    const overBudget = planVal !== 'unlimited' && totalMeals > swipesPerWeek;
    const footer = planVal === 'unlimited'
        ? `<div style="color:var(--text-light);font-size:0.72rem;margin-top:0.4rem;">Unlimited plan — all ${totalMeals} planned meals covered.</div>`
        : `<div style="color:${overBudget ? '#8B2020' : '#2D5A3D'};font-size:0.72rem;margin-top:0.4rem;">${totalMeals} meals planned / ${swipesPerWeek} swipes — ${overBudget ? (totalMeals - swipesPerWeek) + ' over budget ⚠️' : (swipesPerWeek - totalMeals) + ' swipes remaining ✓'}</div>`;
    output.innerHTML = html + footer;
}

// ───── PRICE LOOKUP ─────
const priceData = [
    { name: 'Cheeseburger', price: '$6.50', loc: 'The Grill', votes: 24 },
    { name: 'Large Coffee', price: '$3.25', loc: 'Campus Café', votes: 41 },
    { name: 'Caesar Salad', price: '$5.75', loc: 'Main Hall', votes: 18 },
    { name: 'Slice of Pizza', price: '$3.00', loc: 'The Grill', votes: 33 },
    { name: 'Water Bottle', price: '$2.00', loc: 'All Locations', votes: 55 },
    { name: 'Smoothie', price: '$5.50', loc: 'Campus Café', votes: 12 },
    { name: 'Breakfast Burrito', price: '$7.25', loc: 'Main Hall', votes: 9 },
    { name: 'Bag of Chips', price: '$1.75', loc: 'Grab & Go', votes: 28 },
    { name: 'Oatmeal Bowl', price: '$4.50', loc: 'Main Hall', votes: 16 },
];
let voteCounts = priceData.map(p => p.votes);
function initPrices() { filterPrices(); }
function filterPrices() {
    const q = (document.getElementById('price-search').value || '').toLowerCase();
    const filtered = priceData.map((p, i) => ({ ...p, idx: i })).filter(p => p.name.toLowerCase().includes(q));
    document.getElementById('price-list').innerHTML = filtered.map(p => `
    <div class="price-row">
      <div>
        <div class="item-name">${p.name}</div>
        <div class="item-loc">${p.loc}</div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <span class="item-price">${p.price}</span>
        <div class="vote-row">
          <button class="vote-btn" onclick="vote(${p.idx},1)">▲</button>
          <span class="vote-count" id="vc-${p.idx}">${voteCounts[p.idx]}</span>
          <button class="vote-btn" onclick="vote(${p.idx},-1)">▼</button>
        </div>
      </div>
    </div>`).join('');
}
function vote(idx, dir) {
    voteCounts[idx] = Math.max(0, voteCounts[idx] + dir);
    const el = document.getElementById('vc-' + idx);
    if (el) el.textContent = voteCounts[idx];
}
function addPricePrompt() {
    const name = prompt('Item name?');
    if (!name) return;
    const price = prompt('Price? (e.g. $4.50)');
    if (!price) return;
    const loc = prompt('Location?') || 'Unknown';
    priceData.push({ name, price, loc, votes: 1 });
    voteCounts.push(1);
    filterPrices();
}

// ───── BALANCE TRACKER ─────
function loadBalance() {
    ['swipes', 'exchange', 'guest', 'dollars'].forEach(k => {
        const stored = localStorage.getItem('balance_' + k);
        const input = document.getElementById('in-' + k);
        if (stored !== null) { input.value = stored; }
    });
    updateBalance();
}
function updateBalance() {
    ['swipes', 'exchange', 'guest', 'dollars'].forEach(k => {
        const val = document.getElementById('in-' + k).value;
        const display = document.getElementById('b-' + k);
        localStorage.setItem('balance_' + k, val);
        display.textContent = val !== '' ? (k === 'dollars' ? '$' + parseFloat(val).toFixed(2) : val) : '—';
    });
}

// ───── PLAN VALUE ESTIMATOR ─────
const PLANS = {
    AllAccessPlan: { name: 'All Access Plan', swipes: 999, exchanges: 20, visitors: 10, bearcat: 100, cost: 2820 },
    BlockPlan165: { name: '165 Block Plan', swipes: 145, exchanges: 20, visitors: 10, bearcat: 450, cost: 2820 },
    BlockPlan100: { name: '100 Block Plan', swipes: 90, exchanges: 10, visitors: 5, bearcat: 350, cost: 1830 },
    BlockPlan50: { name: '50 Block Plan', swipes: 50, exchanges: 10, visitors: 0, bearcat: 275, cost: 1100 },
    BlockPlan350: { name: '350 Block Plan', swipes: 0, exchanges: 0, visitors: 0, bearcat: 350, cost: 350 },
};

let selectedPlan = 'AllAccessPlan';
function selectPlan(key, el) {
    selectedPlan = key;
    document.querySelectorAll('.plan-chip').forEach(c => c.classList.remove('on'));
    el.classList.add('on');
    updatePlan();
}
function updatePlan() {
    const mealsDay = parseInt(document.getElementById('meals-per-day').value);
    const p = PLANS[selectedPlan];
    const weeksPerSemester = 16;
    const totalSwipesNeeded = mealsDay * 7 * weeksPerSemester;
    const swipesPerWeek = p.swipes === 999 ? mealsDay * 7 : p.swipes;
    const semesterSwipes = p.swipes === 999 ? totalSwipesNeeded : p.swipes * weeksPerSemester;
    const perMeal = (p.cost / (semesterSwipes || 1)).toFixed(2);
    const coverage = p.swipes === 999 ? 100 : Math.min(100, Math.round((swipesPerWeek / (mealsDay * 7)) * 100));
    document.getElementById('plan-detail').innerHTML = `
    <div class="plan-row"><span class="pl">Plan name</span><span class="pr">${p.name}</span></div>
    <div class="plan-row"><span class="pl">Swipes per Semester</span><span class="pr">${p.swipes === 999 ? 'Unlimited' : p.swipes}</span></div>
    <div class="plan-row"><span class="pl">Meal exchanges/Semester</span><span class="pr">${p.exchanges}</span></div>
    <div class="plan-row"><span class="pl">Visitors/Semester</span><span class="pr">${p.visitors}</span></div>
    <div class="plan-row"><span class="pl">Bearcat/Semester</span><span class="pr">$${p.bearcat}</span></div>
    <div class="plan-row"><span class="pl">Semester cost</span><span class="pr">$${p.cost.toLocaleString()}</span></div>
    <div class="plan-row"><span class="pl">Cost per meal (est.)</span><span class="pr">$${perMeal}</span></div>
    <div class="plan-row"><span class="pl">Weekly meal coverage</span><span class="pr">${coverage}% of your ${mealsDay * 7} meals</span></div>
    <div style="height:4px;border-radius:2px;background:var(--border);margin:0.25rem 0;">
      <div class="plan-value-bar" style="width:${coverage}%"></div>
    </div>`;
    const savings = p.swipes === 999
        ? `Unlimited plan — no swipe budgeting needed.`
        : coverage >= 100 ? `✓ This plan fully covers your ${mealsDay} meal/day habit.`
            : `⚠ You may need ${mealsDay * 7 - swipesPerWeek} extra meals/week from dining dollars.`;
    document.getElementById('plan-savings').textContent = savings;
}