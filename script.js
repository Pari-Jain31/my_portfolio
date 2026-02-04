/* DARK MODE */
/* DARK MODE */
const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector("i");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight);

  if (isLight) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("light");
  icon.classList.replace("fa-moon", "fa-sun");
}


/* MOBILE MENU */
const menu = document.querySelector(".nav-links");
document.getElementById("menuToggle").onclick = () => {
  menu.classList.toggle("active");
};

/* PARTICLES */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="#00f7ff";
    ctx.fill();
    p.x+=p.dx;
    p.y+=p.dy;
  });
  requestAnimationFrame(animate);
}
animate();


/* ================= BASIC ANALYTICS / EVENT TRACKING ================= */

// Initialize analytics store
const analytics = JSON.parse(localStorage.getItem("analytics")) || {
  clicks: {},
  sectionViews: {}
};

// Save analytics
function saveAnalytics() {
  localStorage.setItem("analytics", JSON.stringify(analytics));
}

// Track clicks
function trackClick(name) {
  analytics.clicks[name] = (analytics.clicks[name] || 0) + 1;
  saveAnalytics();
  console.log(`Click tracked: ${name}`, analytics.clicks[name]);
}

// Track section views
function trackSectionView(sectionId) {
  if (!analytics.sectionViews[sectionId]) {
    analytics.sectionViews[sectionId] = 1;
    saveAnalytics();
    console.log(`Section viewed: ${sectionId}`);
  }
}

/* ---------- BUTTON CLICK TRACKING ---------- */

// Theme toggle
document.getElementById("themeToggle")?.addEventListener("click", () => {
  trackClick("Theme Toggle");
});

// Mobile menu
document.getElementById("menuToggle")?.addEventListener("click", () => {
  trackClick("Mobile Menu");
});

// Nav links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    trackClick(`Nav: ${link.textContent}`);
  });
});

/* ---------- SECTION VIEW TRACKING ---------- */

const trackedSections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        trackSectionView(entry.target.id);
      }
    });
  },
  { threshold: 0.6 }
);

trackedSections.forEach(section => observer.observe(section));
