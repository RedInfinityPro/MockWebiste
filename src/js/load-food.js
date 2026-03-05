(async function loadFoodCards(){ 

  // Fetch the JSON data
  try {
    const response = await fetch("databases/food-data.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (err) {
    console.error("load-food.js: Could not load food-data.json –", err);
    return;
  }

  // Find the container that already holds the static cards
  const list = document.querySelector(".food-list");
  if (!list) {
    console.error("load-food.js: No .food-list element found in the DOM.");
    return;
  }

  // Sort names so new events appear at the top
  const names = Object.keys(data).sort((a, b) => a.localeCompare(b));
  // Track how many cards have been added so data-staff indices stay unique
  // (start after however many static cards already exist)
  let cardIndex = list.querySelectorAll(".food-card").length;

  names.forEach(name => {
    const events = data[name];
    if (!Array.isArray(events) || events.length === 0) return;
    // Create one card per event
    events.forEach(event => {
      const { Name = "Untitled Event", Types = "", About = "", Price = "" , Image = ""} = event;
      const card = document.createElement("div");
      card.className = "food-card";
      card.setAttribute("data-staff", cardIndex);
      // Build inner HTML About and Image are optional
      const aboutHTML = Types
        ? `<p>${escapeHTML(Types)}</p>`
        : "";

      const imageHTML = Image
        ? `<div class="food-image">
             <img src="${escapeHTML(Image)}" alt="${escapeHTML(Name)}"
                  onerror="this.closest('.food-image').style.display='none'">
           </div>`
        : "";

      card.innerHTML = `
        <div class="food-info">
          <h2>${escapeHTML(Name)}</h2>
          <h4>Price: ${escapeHTML(Price)}</h4>
          ${aboutHTML}
        </div>
        ${imageHTML}
      `;

      list.appendChild(card);
      cardIndex++;
    });
  });

  console.log(`food-calendar.js: Injected ${cardIndex} total cards.`);

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