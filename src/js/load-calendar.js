// Utility: prevent XSS by escaping user-supplied strings
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

(async function loadCalendarCards() {
  const list = document.querySelector(".calendar-list");
  if (!list) {
    console.error("load-calendar.js: No .calendar-list element found in the DOM.");
    return;
  }

  // --- Loading state ---
  const loader = document.createElement("p");
  loader.className = "calendar-loading";
  loader.textContent = "Loading events…";
  list.appendChild(loader);

  // --- Fetch data ---
  let data;
  try {
<<<<<<< HEAD
    const response = await fetch("databases/calendar-data.json");
=======
    const response = await fetch("./databases/calendar-data.json");
>>>>>>> 087e32f (Final project update for the Lander University food website, adding final internal server files, updating internal path varibles and updating search bars.)
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (err) {
    console.error("load-calendar.js: Could not load calendar-data.json –", err);
    loader.className = "calendar-error";
    loader.textContent = "Could not load events. Please try again later.";
    return;
  }

  loader.remove();
  // --- Build cards ---
  // Sort years newest-first
  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));

  let cardIndex = list.querySelectorAll(".calendar-card").length;

  years.forEach(year => {
    const events = data[year];
    if (!Array.isArray(events) || events.length === 0) return;

    events.forEach(event => {
      const { Name = "Untitled Event", Day = "", About = "", Image = "" } = event;

      const card = document.createElement("div");
      card.className = "calendar-card";
      card.setAttribute("data-calendar", cardIndex);
      card.setAttribute("data-year", year);
      // Store lowercase text for search matching
      card.setAttribute("data-search-text", `${Name} ${Day} ${About}`.toLowerCase());

      const aboutHTML = About
        ? `<p>${escapeHTML(About)}</p>`
        : "";

      const imageHTML = Image
        ? `<div class="event-image">
             <img src="${escapeHTML(Image)}" alt="${escapeHTML(Name)}"
                  onerror="this.closest('.event-image').style.display='none'">
           </div>`
        : "";

      card.innerHTML = `
        <div class="calendar-info">
          <h2>${escapeHTML(Name)}</h2>
          <h4>${escapeHTML(Day)}</h4>
          ${aboutHTML}
        </div>
        ${imageHTML}
      `;

      list.appendChild(card);
      cardIndex++;
    });
  });

  // --- Empty state element (hidden until needed) ---
  const emptyMsg = document.createElement("p");
  emptyMsg.className = "calendar-empty";
  emptyMsg.textContent = "No events match your search.";
  emptyMsg.style.display = "none";
  list.after(emptyMsg);

  console.log(`load-calendar.js: Injected ${cardIndex} total cards.`);

  // --- Search + filter logic ---
  function sortCards(mode) {
  const cards = Array.from(list.querySelectorAll(".calendar-card"));

  cards.sort((a, b) => {
    const nameA = a.querySelector("h2").textContent.toLowerCase();
    const nameB = b.querySelector("h2").textContent.toLowerCase();

    const yearA = Number(a.getAttribute("data-year"));
    const yearB = Number(b.getAttribute("data-year"));

    switch (mode) {
      case "az":
        return nameA.localeCompare(nameB);

      case "za":
        return nameB.localeCompare(nameA);

      case "new":
        return yearB - yearA;

      case "old":
        return yearA - yearB;

      default:
        return 0;
    }
  });

  cards.forEach(card => list.appendChild(card));
}

<<<<<<< HEAD
=======
function applyFilters() {
  const query = document
    .getElementById("calendarSearch")
    ?.value.toLowerCase() || "";

  const cards = Array.from(list.querySelectorAll(".calendar-card"));

  let visibleCount = 0;

  cards.forEach(card => {
    const text = card.getAttribute("data-search-text");

    if (text.includes(query)) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  emptyMsg.style.display = visibleCount === 0 ? "block" : "none";
}

>>>>>>> 087e32f (Final project update for the Lander University food website, adding final internal server files, updating internal path varibles and updating search bars.)
let currentSort = "";

document.querySelectorAll("#calendarFilter a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    currentSort = link.dataset.sort;

    sortCards(currentSort);
    applyFilters();
  });
});

document
  .getElementById("calendarSearch")
  ?.addEventListener("input", applyFilters);
  
})();