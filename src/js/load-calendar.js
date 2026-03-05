(async function loadCalendarCards(){ 

  // Fetch the JSON data
  try {
    const response = await fetch("databases/calendar-data.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (err) {
    console.error("load-calendar.js: Could not load calendar-data.json –", err);
    return;
  }

  // Find the container that already holds the static cards
  const list = document.querySelector(".calendar-list");
  if (!list) {
    console.error("load-calendar.js: No .calendar-list element found in the DOM.");
    return;
  }

  // Sort years newest-first so new events appear at the top
  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));
  // Track how many cards have been added so data-staff indices stay unique
  // (start after however many static cards already exist)
  let cardIndex = list.querySelectorAll(".calendar-card").length;

  years.forEach(year => {
    const events = data[year];
    if (!Array.isArray(events) || events.length === 0) return;
    // Create one card per event
    events.forEach(event => {
      const { Name = "Untitled Event", Day = "", About = "", Image = "" } = event;
      const card = document.createElement("div");
      card.className = "calendar-card";
      card.setAttribute("data-staff", cardIndex);
      // Build inner HTML About and Image are optional
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
          <h4>Day: ${escapeHTML(Day)}</h4>
          ${aboutHTML}
        </div>
        ${imageHTML}
      `;

      list.appendChild(card);
      cardIndex++;
    });
  });

  console.log(`load-calendar.js: Injected ${cardIndex} total cards.`);

})();

// Utility: prevent XSS by escaping user-supplied strings
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}