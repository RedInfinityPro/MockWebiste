(async function loadStaffCards(){ 

  // Fetch the JSON data
  try {
    const response = await fetch("databases/staff-data.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (err) {
    console.error("load-staff.js: Could not load staff-data.json –", err);
    return;
  }

  // Find the container that already holds the static cards
  const list = document.querySelector(".staff-list");
  if (!list) {
    console.error("load-staff.js: No .staff-list element found in the DOM.");
    return;
  }

  // Sort names so new events appear at the top
  const names = Object.keys(data).sort((a, b) => a.localeCompare(b));
  // Track how many cards have been added so data-staff indices stay unique
  // (start after however many static cards already exist)
  let cardIndex = list.querySelectorAll(".staff-card").length;

  names.forEach(name => {
    const events = data[name];
    if (!Array.isArray(events) || events.length === 0) return;
    // Create one card per event
    events.forEach(event => {
      const { Name = "Untitled Staff", Department = "", About = "", Image = "" } = event;
      const card = document.createElement("div");
      card.className = "staff-card";
      card.setAttribute("data-staff", cardIndex);
      // Build inner HTML About and Image are optional
      const aboutHTML = About
        ? `<p>${escapeHTML(About)}</p>`
        : "";

      const imageHTML = Image
        ? `<div class="staff-image">
             <img src="${escapeHTML(Image)}" alt="${escapeHTML(Name)}"
                  onerror="this.closest('.staff-image').style.display='none'">
           </div>`
        : "";

      card.innerHTML = `
        ${imageHTML}
        <div class="staff-info">
          <h2>${escapeHTML(Name)}</h2>
          <h4>Department: ${escapeHTML(Department)}</h4>
          ${aboutHTML}
        </div>
      `;

      list.appendChild(card);
      cardIndex++;
    });
  });

  console.log(`load-staff.js: Injected ${cardIndex} total cards.`);

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