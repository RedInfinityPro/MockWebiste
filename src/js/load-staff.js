// Utility: prevent XSS by escaping user-supplied strings
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

(async function loadStaffCards() {
  const list = document.querySelector(".staff-list");
  if (!list) {
    console.error("load-staff.js: No .staff-list element found in the DOM.");
    return;
  }

  // --- Loading state ---
  const loader = document.createElement("p");
  loader.className = "staff-loading";
  loader.textContent = "Loading Staff…";
  list.appendChild(loader);

  // --- Fetch data ---
  let data;
  try {
<<<<<<< HEAD
    const response = await fetch("databases/staff-data.json");
=======
    const response = await fetch("./databases/staff-data.json");
>>>>>>> 087e32f (Final project update for the Lander University food website, adding final internal server files, updating internal path varibles and updating search bars.)
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (err) {
    console.error("load-staff.js: Could not load staff-data.json –", err);
    loader.className = "staff-error";
    loader.textContent = "Could not load any staff. Please try again later.";
    return;
  }

  loader.remove();
  // --- Build cards ---
  // Sort years newest-first
  const names = Object.keys(data).sort((a, b) => a.localeCompare(b));
  let cardIndex = list.querySelectorAll(".staff-card").length;

  names.forEach(name => {
    const staffMember = data[name];
    if (!Array.isArray(staffMember) || staffMember.length === 0) return;

    staffMember.forEach(staffMember => {
      const { Name = "Untitled Staff", Department = "", About = "", Image = "" } = staffMember;

      const card = document.createElement("div");
      card.className = "staff-card";
      card.setAttribute("data-staff", cardIndex);
      card.setAttribute("data-department", Department);
      // Store lowercase text for search matching
      card.setAttribute("data-search-text", `${Name} ${Department} ${About}`.toLowerCase());

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
        <div class="staff-info">
          <h2>${escapeHTML(Name)}</h2>
          <h4>${escapeHTML(Department)}</h4>
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
  emptyMsg.className = "staff-empty";
<<<<<<< HEAD
  emptyMsg.textContent = "No events match your search.";
=======
  emptyMsg.textContent = "No staff match your search.";
>>>>>>> 087e32f (Final project update for the Lander University food website, adding final internal server files, updating internal path varibles and updating search bars.)
  emptyMsg.style.display = "none";
  list.after(emptyMsg);

  console.log(`load-staff.js: Injected ${cardIndex} total cards.`);

  // --- Search + filter logic ---
  function sortCards(mode) {
  const cards = Array.from(list.querySelectorAll(".staff-card"));

  cards.sort((a, b) => {
    const nameA = a.querySelector("h2").textContent.toLowerCase();
    const nameB = b.querySelector("h2").textContent.toLowerCase();

    const deptA = a.getAttribute("data-department");
    const deptB = b.getAttribute("data-department");

    switch (mode) {

      case "az-name":
        return nameA.localeCompare(nameB);

      case "za-name":
        return nameB.localeCompare(nameA);

      case "az-dept":
        return deptA.localeCompare(deptB);

      case "za-dept":
        return deptB.localeCompare(deptA);

      default:
        return 0;
    }
  });

  cards.forEach(card => list.appendChild(card));
}

function applyFilters() {
  const query = document
    .getElementById("staffSearch")
    ?.value.toLowerCase() || "";

  const cards = Array.from(list.querySelectorAll(".staff-card"));

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

let currentSort = "";

document.querySelectorAll("#staffFilter a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    currentSort = link.dataset.sort;

    sortCards(currentSort);
    applyFilters();
  });
});

document
  .getElementById("staffSearch")
  ?.addEventListener("input", applyFilters);
})();