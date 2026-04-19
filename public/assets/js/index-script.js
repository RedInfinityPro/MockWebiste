/*

TemplateMo 595 3d coverflow

https://templatemo.com/tm-595-3d-coverflow

*/

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// JavaScript Document
// Coverflow functionality
const items = document.querySelectorAll('.coverflow-item');
const dotsContainer = document.getElementById('dots');
const currentTitle = document.getElementById('current-title');
const currentDescription = document.getElementById('current-description');
const currentHours = document.getElementById('current-hours');
const container = document.querySelector('.coverflow-container');
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
let currentIndex = Math.floor(Math.random() * 7);
let isAnimating = false;

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainMenu.classList.toggle('active');
});

// Close mobile menu when clicking on menu items (except external links)
document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
    item.addEventListener('click', (e) => {
        menuToggle.classList.remove('active');
        mainMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        mainMenu.classList.remove('active');
    }
});

// Image data with titles and descriptions
const imageData = [
    {
        title: "The Underground in Grier Center",
        description: "All-you-can-eat dining option.",
        hours: "Monday - Thursday: 7:00AM - 9:00PM | Friday: 7:00AM - 8:00PM | Saturday: 9:30AM - 8:00PM | Sunday: 9:30AM - 9:00PM"
    },
    {
        title: "Chick-fil-A",
        description: "Chick-fil-A focuses on providing memorable experiences by ensuring quality food and friendly service.",
        hours: "Monday - Thursday: 7:30AM - 10:00PM | Friday: 7:30AM - 8:30PM | Saturday - Sunday: Closed"
    },
    {
        title: "The Drop",
        description: "It will offer a variety of meals ordered via mobile or kiosk, with multiple restaurant options.",
        hours: "Monday - Thursday: 7:30AM - 10:00PM | Friday: 7:30AM - 8:30PM | Saturday - Sunday: Close"
    },
    {
        title: "Starbucks",
        description: "Starbucks focuses on high-quality coffee, values its partners, and aims to positively impact communities and the environment",
        hours: "Monday - Thursday: 7:30AM - 11:00PM | Friday: 7:30AM - 7:30PM | Saturday: 8:30AM - 4:30PM | Sunday: 4:30PM - 11:00PMM"
    },
    {
        title: "Freshens",
        description: "The restaurant offers fresh items like flatbreads and smoothies, and has received positive feedback.",
        hours: "Monday - Friday: 8:00AM - 4:00PM | Saturday - Sunday: Closed"
    },
    {
        title: "Greenwood Marketplace",
        description: "Lander University opens Greenwood Marketplace for students and staff.",
        hours: "Monday - Thursday: 7:30AM - 7:20PM | Friday: 7:30AM - 4:30PM | Saturday - Sunday: Closed"
    },
    {
        title: "Bear Necessities Food Pantry",
        description: "Bear Necessities Food Pantry established."
    }
];

// Create dots
items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => goToIndex(index);
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');
let autoplayInterval = null;
let isPlaying = true;
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

function updateCoverflow() {
    if (isAnimating) return;
    isAnimating = true;

    items.forEach((item, index) => {
        let offset = index - currentIndex;

        if (offset > items.length / 2) {
            offset = offset - items.length;
        }
        else if (offset < -items.length / 2) {
            offset = offset + items.length;
        }

        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);

        let translateX = offset * 220;
        let translateZ = -absOffset * 200;
        let rotateY = -sign * Math.min(absOffset * 60, 60);
        let opacity = 1 - (absOffset * 0.2);
        let scale = 1 - (absOffset * 0.1);

        if (absOffset > 3) {
            opacity = 0;

            translateX = sign * 800;
        }

        item.style.transform = `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                `;
        item.style.opacity = opacity;
        item.style.zIndex = 100 - absOffset;

        item.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    const currentData = imageData[currentIndex];
    currentTitle.textContent = currentData.title;
    currentDescription.textContent = currentData.description;
    renderHours(currentData.hours);

    currentTitle.style.animation = 'none';
    currentDescription.style.animation = 'none';
    setTimeout(() => {
        currentTitle.style.animation = 'fadeIn 0.6s forwards';
        currentDescription.style.animation = 'fadeIn 0.6s forwards';
    }, 10);

    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

function navigate(direction) {
    if (isAnimating) return;

    currentIndex = currentIndex + direction;

    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    } else if (currentIndex >= items.length) {
        currentIndex = 0;
    }

    updateCoverflow();
}

// Keyboard navigation
container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
});

// Click on items to select
items.forEach((item, index) => {
    item.addEventListener('click', () => {
        handleUserInteraction();
        goToIndex(index);
    });
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let isSwiping = false;

container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    isSwiping = true;
}, { passive: true });

container.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.changedTouches[0].screenX;
    const diff = currentX - touchStartX;

    if (Math.abs(diff) > 10) {
        e.preventDefault();
    }
}, { passive: false });

container.addEventListener('touchend', (e) => {
    if (!isSwiping) return;

    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
    isSwiping = false;
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 30;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        handleUserInteraction();

        if (diffX > 0) {
            navigate(1);
        } else {
            navigate(-1);
        }
    }
}

// Initialize images and reflections
items.forEach((item, index) => {
    const img = item.querySelector('img');
    const reflection = item.querySelector('.reflection');

    img.onload = function () {

        this.parentElement.classList.remove('image-loading');
        reflection.style.setProperty('--bg-image', `url(${this.src})`);
        reflection.style.backgroundImage = `url(${this.src})`;
        reflection.style.backgroundSize = 'cover';
        reflection.style.backgroundPosition = 'center';
    };

    img.onerror = function () {
        this.parentElement.classList.add('image-loading');
    };
});

// Autoplay functionality
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCoverflow();
    }, 4000);
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
}

function toggleAutoplay() {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

function handleUserInteraction() {
    stopAutoplay();
}

// Add event listeners to stop autoplay on manual navigation
items.forEach((item) => {
    item.addEventListener('click', handleUserInteraction);
});

document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);

dots.forEach((dot) => {
    dot.addEventListener('click', handleUserInteraction);
});

container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        handleUserInteraction();
    }
});

// Smooth scrolling and active menu item
const sections = document.querySelectorAll('.section');
const menuItems = document.querySelectorAll('.menu-item');
const header = document.getElementById('header');
const scrollToTopBtn = document.getElementById('scrollToTop');

// Update active menu item on scroll
function updateActiveMenuItem() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            menuItems.forEach(item => {
                if (!item.classList.contains('external')) {
                    item.classList.remove('active');
                }
            });
            if (menuItems[index] && !menuItems[index].classList.contains('external')) {
                menuItems[index].classList.add('active');
            }
        }
    });

    // Header background on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateActiveMenuItem);

// Smooth scroll to section
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const targetId = item.getAttribute('href');

        // Check if it's an internal link (starts with #)
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // External links will open normally in new tab
    });
});

// Logo click to scroll to top
document.querySelector('.logo-container').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll to top button
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    event.target.reset();
}

// Initialize
updateCoverflow();
container.focus();
startAutoplay();

const staffRatings = [
    { total: 0, count: 0 },
    { total: 0, count: 0 }
];

function renderHours(hoursString) {
    if (!hoursString) {
        currentHours.innerHTML = '';
        return;
    }
    const segments = hoursString.split('|').map(s => s.trim());
    currentHours.innerHTML = '<div class="hours-bar">' +
        segments.map(seg => {
            const [days, times] = seg.split(':').map(s => s.trim());
            // find first colon that's part of the time (after the day label)
            const colonIdx = seg.indexOf(':');
            const dayPart = seg.substring(0, colonIdx).trim();
            const timePart = seg.substring(colonIdx + 1).trim();
            const isClosed = timePart.toLowerCase().includes('close');
            return `<div class="hours-chip${isClosed ? ' closed' : ''}">
                <span class="day-label">${dayPart}</span>
                <span class="divider"></span>
                <span class="time-val">${timePart}</span>
            </div>`;
        }).join('') +
        '</div>';
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

(async function loadCalendarCards() {
    const list = document.querySelector(".events-showcase-display");
    if (!list) {
        console.error("index-script.js: No .events-showcase-display element found in the DOM.");
        return;
    }

    // --- Loading state ---
    const loader = document.createElement("p");
    loader.className = "events-showcase-loading";
    loader.textContent = "Loading events…";
    list.appendChild(loader);

    // --- Fetch data ---
    let data;
    try {
        const response = await fetch("./src/data/calendar-data.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        data = await response.json();
    } catch (err) {
        console.error("index-script.js: Could not load calendar-data.json –", err);
        loader.className = "calendar-error";
        loader.textContent = "Could not load events. Please try again later.";
        return;
    }

    loader.remove();

    // --- Flatten all events into one array ---
    const allEvents = [];
    Object.entries(data).forEach(([year, events]) => {
        if (!Array.isArray(events)) return;
        events.forEach(event => {
            // Skip the static "Add Event" placeholder
            if ((event.Name || "").toLowerCase() === "add event") return;
            allEvents.push({ ...event, year });
        });
    });

    // --- Pick 3 at random (or fewer if not enough events) ---
    const count = Math.min(5, allEvents.length);
    const picked = [];
    const used = new Set();
    while (picked.length < count) {
        const i = Math.floor(Math.random() * allEvents.length);
        if (!used.has(i)) {
            used.add(i);
            picked.push(allEvents[i]);
        }
    }

    // --- Internal summarizer ---
    // Common filler words to ignore when extracting highlights
    const STOP_WORDS = new Set([
        "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with",
        "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does",
        "did", "will", "would", "could", "should", "may", "might", "shall", "that", "this",
        "it", "its", "we", "our", "you", "your", "they", "their", "us", "from", "by", "as",
        "up", "out", "not", "no", "so", "if", "all", "any", "each", "more", "than", "then",
        "when", "which", "who", "how", "what", "there", "here", "just", "also", "about",
    ]);

    function summarize(text, maxWords = 16) {
        if (!text) return { summary: "", highlights: [] };

        const words = text.split(/\s+/);

        // Summary: first maxWords words, trimmed at last complete sentence if possible
        const trimmed = words.slice(0, maxWords).join(" ");
        const summary = words.length > maxWords
            ? (trimmed.match(/^(.*[.!?])/s)?.[1] || trimmed) + "…"
            : trimmed;

        // Highlights: unique non-stop words longer than 3 chars, capitalised or long
        const seen = new Set();
        const highlights = [];
        words.forEach(raw => {
            const word = raw.replace(/[^a-zA-Z]/g, "");
            const lower = word.toLowerCase();
            if (
                word.length > 3 &&
                !STOP_WORDS.has(lower) &&
                !seen.has(lower) &&
                // Prefer words that are capitalised mid-sentence, or notably long
                (word[0] === word[0].toUpperCase() || word.length >= 7)
            ) {
                seen.add(lower);
                highlights.push(capitalizeFirstLetter(word));
            }
        });

        return { summary, highlights: highlights.slice(0, (Math.random() * 6) + 1) };
    }

    // --- Build cards ---
    // --- Build cards ---
    picked.forEach((event, idx) => {
        const { Name = "Untitled Event", Day = "", About = "", Image = "" } = event;
        const { summary, highlights } = summarize(About);

        const card = document.createElement("div");
        card.className = "events-showcase-main";
        card.setAttribute("data-calendar", idx);
        card.setAttribute("data-day", Day);

        const highlightsHTML = highlights.length
            ? highlights.map(w =>
                `<a href="#" class="badge">${escapeHTML(w)}</a>`
            ).join("")
            : "";

        card.innerHTML = `
            <div class="corner-decoration top-left"></div>
            <div class="corner-decoration bottom-right"></div>
            <div class="event-tag"><i class="fa-solid fa-calendar-day"></i> ${escapeHTML(Day)}</div>
            <h3 class="event-title">${escapeHTML(Name)}</h3>
            <p class="event-desc">${escapeHTML(summary)}</p>
            <div class="event-badges">
                ${highlightsHTML}
            </div>
        `;

        list.appendChild(card);
    });

    console.log(`index-script.js: Displayed ${picked.length} random events.`);
})();