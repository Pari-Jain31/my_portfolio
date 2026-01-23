/* DARK MODE */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light"));
};
if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("light");
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

